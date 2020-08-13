import { Router } from 'express';

import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import ClassesController from '../../../../controllers/ClassesController';
import ConnectionsController from '../../../../controllers/ConnectionsController';

const routes = Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

routes.use(usersRouter);

export default routes;
