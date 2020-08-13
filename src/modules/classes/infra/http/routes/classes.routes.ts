import { Router } from 'express';

import ClassesController from '../controllers/ClassesController';

const classesController = new ClassesController();

const classesRouter = Router();

classesRouter.get('/classes', classesController.index);
classesRouter.post('/classes', classesController.create);

export default classesRouter;
