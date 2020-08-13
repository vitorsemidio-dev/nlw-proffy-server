import { Router } from 'express';

import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import classesRouter from '../../../../modules/classes/infra/http/routes/classes.routes';
import connectionsRouter from '../../../../modules/classes/infra/http/routes/connections.routes';

const routes = Router();

routes.use(usersRouter);
routes.use(classesRouter);
routes.use(connectionsRouter);

export default routes;
