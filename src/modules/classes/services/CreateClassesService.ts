import db from '../../../shared/infra/knex/connections';

import convertHourToMinutes from '../../../utils/convertHourToMinutes';

interface ISchedule {
  week_day: number;
  from: string;
  to: string;
}

interface IRequest {
  subject_id: number;
  user_id: number;
  cost: number;
  schedule: ISchedule[];
}

export default class CreateClassesService {
  public async execute({
    subject_id,
    user_id,
    cost,
    schedule,
  }: IRequest): Promise<void> {
    // TODO: Check user_id/subject_id
    // TODO: Cost positive
    const trx = await db.transaction();
    try {
      const [class_id] = await trx('classes').insert({
        user_id,
        subject_id,
        cost,
      });

      const classSchedule = schedule.map((scheduleItem: ISchedule) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await trx('class_schedule').insert(classSchedule);

      trx.commit();
    } catch (err) {
      trx.rollback();
      throw new Error('Unexpected error while creating new class');
    }
  }
}
