import { prisma } from '../utils/prisma.util.js';
import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';

export class ResumesRepository {
    createResume = async (authorId, title, content) => {
        try{const resume = await prisma.resume.create({
            data: {
                authorId, title, content,
            }
        })
        return resume;
    } catch (error) {
        throw new HttpError.InternalServerError(MESSAGES.RESUMES.CREATE.FAILED);
    }
    }

    findAllResumesByAuthorId = async (authorId, sort) => {
        try{const resumes = await prisma.resume.findMany({
            where: {authorId: parseInt(authorId)},
            orderBy:{
                createdAt: sort,
            },
            include: {
                author:true,
            },
        });

        return resumes;
    } catch {
        throw new HttpError.InternalServerError(MESSAGES.RESUMES.READ_LIST.FAILED)
    }
    }

    findResumeById = async (id, authorId) => {
        try{
            const resume = await prisma.resume.findUnique({
            where: {id: parseInt(id),
                    authorId: parseInt(authorId)
            },
        })
        return resume;
    } catch{
        throw new HttpError.NotFound(MESSAGES.RESUMES.READ_DETAIL.FAILED)
    }
    }

    updateResumeById = async (id, authorId, title, content) => {
        try{
            const updatedResume = await prisma.update({
            where: {id: parseInt(id),
                authorId: parseInt(authorId)
            },
            data: {
                ...(title && { title }),
                ...(content && { content }),
            }
        })

        return updatedResume;
    } catch{
        throw new HttpError.InternalServerError(MESSAGES.RESUMES.UPDATE.FAILED)
    }
    }

    deleteResumeById = async (id, authorId) => {
        try{
        const deletedResume = await prisma.resume.delete({
            where: {id: parseInt(id),
                authorId: parseInt(authorId)
            },
        });

        return deletedResume;
        } catch(error){
            throw new HttpError.InternalServerError(MESSAGES.RESUMES.DELETE.FAILED)
        } 
    }
}