import { Router } from 'express';

import ConnectionsController from '../controllers/ConnectionsController';

const connectionsRouter = Router();
const connectionsController = new ConnectionsController();

connectionsRouter.post('/connections', connectionsController.create);
connectionsRouter.get('/connections', connectionsController.index);

export default connectionsRouter;
