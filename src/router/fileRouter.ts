import { Router, Request, Response } from 'express';
//import { Router } from 'express';
//import { FileService } from '../service/fileService';
//import { getFileHandler } from '../controller/fileController';

//export const fileRouter = (fileService: FileService) => {
export const fileRouter = (getFileHandler: (req: Request, res: Response) => void) => {
  const router = Router();
  router.get('/', getFileHandler);
  return router;
};
