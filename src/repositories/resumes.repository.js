import { prisma } from '../utils/prisma.util.js';

export class ResumesRepository {
    createResume = async (authorId, title, content) => {
        const resume = await prisma.resume.create({
            data: {
                authorId, title, content,
            }
        })
        
        return resume;
    }

    findAllResumesById = async (authorId) => {
        const resumes = await prisma.resume.findUnique({
            where: {authorId: parseInt(authorId)},
        })

        return resumes;
    }

    findResumeById = async (id, authorId) => {
        const resume = await prisma.resume.findUnique({
            where: {id: parseInt(id),
                    authorId: parseInt(authorId)
            },
        })
        return resume;
    }

    updateResumeById = async (id, authorId) => {
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
    }

    deleteResumeById = async (id, authorId) => {
        
        const deletedResume = await this.prisma.resume.delete({
            where: {id: parseInt(id),
                authorId: parseInt(authorId)
            },
        });

        return deletedResume;
    }
}