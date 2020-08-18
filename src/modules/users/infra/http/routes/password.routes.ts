import { Router } from 'express';

const passwordRouter = Router();

passwordRouter.post('/forgot');
passwordRouter.post('/reset');

export default passwordRouter;
