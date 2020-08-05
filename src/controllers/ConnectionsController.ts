import { Request, Response } from 'express';
import db from '../database/connections';

export default class ConnectionsController {
  async index(request: Request, response: Response): Promise<Response> {
    // 
    return response.json();
  };

  async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;

    await db('connections').insert({
      user_id,
    });

    return response.status(201).send();
  };
}