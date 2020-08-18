import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

import classesRouter from '@modules/classes/infra/http/routes/classes.routes';
import connectionsRouter from '@modules/classes/infra/http/routes/connections.routes';
import subjectsRouter from '@modules/classes/infra/http/routes/subjects.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);

routes.use('/classes', classesRouter);
routes.use('/subjects', subjectsRouter);
routes.use('/connections', connectionsRouter);

export default routes;
