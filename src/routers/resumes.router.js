import express from 'express';
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
import { updateResumeValidator } from '../middlewares/validators/updated-resume-validator.middleware.js';
import { ResumesController } from '../controllers/resumes.controller.js';
import { errorHandler } from '../middlewares/error-handler.middleware.js';

const resumesRouter = express.Router();
const resumesController = new ResumesController();


resumesRouter.post('/', createResumeValidator, resumesController.createResume);
resumesRouter.get('/', resumesController.findAllResumesByAuthorId);
resumesRouter.get('/:id', resumesController.findResumeById);
resumesRouter.put('/:id', updateResumeValidator, resumesController.updateResumeById);
resumesRouter.delete('/:id', resumesController.deleteResumeById);

resumesRouter.use(errorHandler);

export { resumesRouter };
