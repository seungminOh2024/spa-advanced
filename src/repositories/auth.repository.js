import { prisma } from '../utils/prisma.util.js';

export class authRepository {
    findUserByEmail = async (email) => {
        return await prisma.user.findUnique({ where: { email } });
    };

    createUser = async (email, password, name) => {
        return await prisma.user.create({
            data: {
                email,
                password,
                name,
            },
        });
    };


}

