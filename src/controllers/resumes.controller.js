import { ResumesService } from '../services/resumes.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class ResumesController{
    resumesService = new ResumesService();

    createResume = async (req, res, next) => {
        try{
            const user = req.user;
            const { title, content } = req.body;
            const authorId = user.id;


            const createdResume = await this.resumesService.createResume(authorId, title, content,)


            return res.status(HTTP_STATUS.CREATED).json({
                status: HTTP_STATUS.CREATED,
                message: MESSAGES.RESUMES.CREATE.SUCCEED,
                data: createdResume
            })


        } catch (err) {
            next(err)
        }
    }

    
    findAllResumesByAuthorId = async (req, res, next) => {
        try {

            const user = req.user;
            const authorId = user.id;

            const resumes = await this.resumesService.findAllResumesByAuthorId(authorId);
  
            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
                data: resumes,
              });



        } catch (err) {
            next(err)
        }
    }

    
    findResumeById = async (req, res, next) => {
        try{
            const user = req.user;
            const authorId = user.id;
  
            const { id } = req.params;

            const resume = await this.resumesService.findResumeById(id);


            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
                data: resume,
              });


        } catch(err) {
            next(err)
        }





    }

    updateResumeById = async (req, res, next) => {
        try{
            const user = req.user;
            const authorId = user.id;
        
            const { id } = req.params;
        
            const { title, content } = req.body;

            const updatedResume = await this.resumesService.updateResume(id, authorId, title, content); 

            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.UPDATE.SUCCEED,
                data: updatedResume,
              });

        } catch(err) {
            next(err)
        }

    }

    deleteResumeById = async (req, res, next) => {
        try{
            const user = req.user;
            const authorId = user.id;
  
            const { id } = req.params;
            
            const deletedResume = await this.resumesService.deleteResumeById(authorId, id);



            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.DELETE.SUCCEED,
                data: deletedResume,
             });

        } catch(err) {
            next(err)
        }
    }






}

  
  
 
  
  
  
