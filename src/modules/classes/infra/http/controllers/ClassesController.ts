import { Request, Response } from 'express';

import db from '../../../../../shared/infra/knex/connections';
import convertHourToMinutes from '../../../../../utils/convertHourToMinutes';
import CreateClassesService from '../../../services/CreateClassesService';

const createClassesService = new CreateClassesService();

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response): Promise<Response> {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search',
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    console.log(timeInMinutes);

    const classes = await db('classes')
      // eslint-disable-next-line func-names
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject_id,
      user_id,
      cost,
      schedule,
    } = request.body;
    // const trx = await db.transaction();
    console.log('here');

    try {
      // const insertedUsersIds = await trx('users').insert({
      //   name,
      //   avatar,
      //   whatsapp,
      //   bio,
      // });

      // const user_id = insertedUsersIds[0];

      // const insertedClassesIds = await trx('classes').insert({
      //   subject_id,
      //   cost,
      //   user_id,
      // });

      // const class_id = insertedClassesIds[0];

      const class_id = await createClassesService.execute({
        user_id,
        subject_id,
        cost,
      });

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await db('class_schedule').insert(classSchedule);

      // await trx.commit();

      return response.status(201).send();
    } catch (err) {
      // await trx.rollback();
      return response.status(400).json({
        error: 'Unexpected error while creating new class',
      });
    }
  }
}
