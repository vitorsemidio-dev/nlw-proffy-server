import { Router } from 'express';
import SubjectsController from '../controllers/SubjectsController';

const subjectsRouter = Router();
const subjectsController = new SubjectsController();

subjectsRouter.get('/', subjectsController.index);

subjectsRouter.get('/:subject_id', subjectsController.show);

subjectsRouter.post('/', subjectsController.create);

export default subjectsRouter;
