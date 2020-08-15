import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import classesRouter from '@modules/classes/infra/http/routes/classes.routes';
import connectionsRouter from '@modules/classes/infra/http/routes/connections.routes';
import subjectsRouter from '@modules/classes/infra/http/routes/subjects.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);

routes.use('/classes', classesRouter);
routes.use('/subjects', subjectsRouter);
routes.use('/connections', connectionsRouter);

export default routes;
