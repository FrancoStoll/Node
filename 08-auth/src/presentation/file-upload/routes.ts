import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';







export class FileUploadRoutes {


  static get routes(): Router {

    const router = Router();

    const uploadFileService = new FileUploadService()
    const controller = new FileUploadController(uploadFileService);
    router.use(FileUploadMiddleware.containFiles);
    router.use(TypeMiddleware.validType(['users', 'products', 'category']));
    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type', controller.uploadMultipleFile);

    return router

  }


}

