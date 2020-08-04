import { Router, Request, Response } from 'express'

const routes = Router();

routes.post('/classes', async (request: Request, response: Response) => {
  const { body } = request;

  console.log(body);

  return response.json({ ok: true });
})

export default routes