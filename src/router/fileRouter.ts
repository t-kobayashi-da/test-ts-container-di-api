import { Router } from 'express';
import { FileService } from '../service/fileService';
import { getFileHandler } from '../controller/fileController';

export const fileRouter = (fileService: FileService) => {
  const router = Router();
  router.get('/', getFileHandler(fileService));
  return router;
};
