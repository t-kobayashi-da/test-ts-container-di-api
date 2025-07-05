import express from 'express';
import { fileRouter } from './router/fileRouter';
import { FileService } from './service/fileService';
import { FileRepository } from './repository/fileRepository';

export const createApp = () => {
  const app = express();

  const fileRepository = new FileRepository();
  const fileService = new FileService(fileRepository);

  app.use('/file', fileRouter(fileService));
}
