import { ResumesRepository } from '../repositories/resumes.repository.js';
import { MESSAGES } from '../constants/message.constant.js';


export class ResumesService {
    resumesRepository = new ResumesRepository();

    createResume = async (authorId, title, content) => {
        const createdResume = await this.resumesRepository.createResume(
            authorId, title, content
        );

        return {
            id: createdResume.id,
            authorId: createdResume.authorId,
            title: createdResume.title,
            content: createdResume.content,
            status: createdResume.status,
            createdAt: createdResume.createdAt,
            updatedAt: createdResume.updatedAt
        }


    }

    findAllResumes = async (authorId) => {
        const resumes = await this.resumesRepository.findAllResumes(authorId);

        let { sort } = req.query;

        sort = sort?.toLowerCase();
    
        if (sort !== 'desc' && sort !== 'asc') {
          sort = 'desc';
        }

        return resumes.map((resume) => {
            return {
              id: resume.id,
              authorName: resume.author.name,
              title: resume.title,
              content: resume.content,
              status: resume.status,
              createdAt: resume.createdAt,
              updatedAt: resume.updatedAt,
            };
          });
    }

    findResumeById = async (id, authorId) => {
        const resume = await this.resumesRepository.findResumeById(id, authorId);

        if(!resume)
            throw new Error(MESSAGES.RESUMES.COMMON.NOT_FOUND) 
        

        return{
                id: data.id,
                authorName: data.author.name,
                title: data.title,
                content: data.content,
                status: data.status,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
        }
    }

    updateResumeById = async (id, authorId, title, content) => {
        const resume = await this.resumesRepository.findResumeById(id, authorId);
    
        if(!resume)
            throw new Error(MESSAGES.RESUMES.COMMON.NOT_FOUND) 

        await this.resumesRepository.updateResumeById(id, authorId, title, content);

        const updatedResume = await this.resumesRepository.findResumeById(id, authorId);

        return updatedResume;

    }


    deleteResume = async (id, authorId) =>{
        const resume = await this.resumesRepository.findResumeById(id, authorId);

        if(!resume)
            throw new Error('MESSAGES.RESUMES.COMMON.NOT_FOUND') 

        await this.resumesRepository.deletePost(id, authorId);

        return { id: resume.id }

        }
    }



