import request from 'supertest';
import express from 'express';

//import express from 'express';

import { fileRouter } from '../fileRouter';

describe('FileRouter', () => {
  it('GET / returns text', async () => {
    const mockService = { getTextFile: jest.fn().mockReturnValue('router test') };

    const app = express();
    app.use('/file', fileRouter(mockService as any));

    const res = await request(app).get('/file');

    expect(res.status).toBe(200);
    expect(res.text).toBe('router test');
  })
});
