import { Router } from 'express';

import ClassesController from '../controllers/ClassesController';

const classesController = new ClassesController();

const classesRouter = Router();

classesRouter.get('/', classesController.index);
classesRouter.post('/', classesController.create);

export default classesRouter;
