import { getFileHandler } from '../fileController';
import { Request, Response } from 'express';

describe('FileController', () => {
  it('getFileHandler returns text response', () => {
    const mockService = { getTextFile: jest.fn().mockReturnValue('controller test') };
    const req = {} as Request;
    const res = {
      type: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as unknown as Response;

    const handler = getFileHandler(mockService as any);
    handler(req, res);

    expect(res.type).toHaveBeenCalledWith('text/plain');
    expect(res.send).toHaveBeenCalledWith('controller test');
  });
});
