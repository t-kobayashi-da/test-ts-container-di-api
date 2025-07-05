import request from 'supertest';
import express from 'express';
import { fileRouter } from '../fileRouter';
import { Request, Response } from 'express';

describe('FileRouter', () => {
  it('GET / returns text', async () => {
    // モックのハンドラー関数を用意
    const mockHandler = (_req: Request, res: Response) => {
        res.type('text/plain').send('router test');
    };
 
    const app = express();
    app.use('/file', fileRouter(mockHandler));

    const res = await request(app).get('/file');

    expect(res.status).toBe(200);
    expect(res.text).toBe('router test');
  })
});
