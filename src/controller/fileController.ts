import { Request, Response } from 'express';
import { FileService } from '../service/fileService';
import { logger } from '../util/logger';

export const getFileHandler = (fileService: FileService) => {
  return (req: Request, res: Response) => {
    logger('Received request for /file');
    const content = fileService.getTextFile();
    res.type('text/plain').send(content);
  };
};
