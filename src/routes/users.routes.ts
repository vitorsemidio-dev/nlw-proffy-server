import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/users', (request, response) => {
  console.log('users');
  return response.status(201).send();
});

export default usersRouter;