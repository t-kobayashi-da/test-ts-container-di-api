import express from 'express';
import { fileRouter } from './router/fileRouter';
import { FileService } from './service/fileService';
import { FileRepository } from './repository/fileRepository';
import { getFileHandler } from './controller/fileController';

export const createApp = () => {
  const app = express();

  const fileRepository = new FileRepository();
  const fileService = new FileService(fileRepository);
  const fileHandler = getFileHandler(fileService);

  app.use('/file', fileRouter(fileHandler));
}
