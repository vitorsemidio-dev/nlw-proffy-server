import { Router, Request, Response } from 'express';

import db from './database/connections';

const routes = Router();

routes.post('/classes', async (request: Request, response: Response): Promise<Response> => {
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule,
  } = request.body;

  await db('users').insert({
    name,
    avatar,
    whatsapp,
    bio,
  });

  return response.json({ ok: true });
})

export default routes