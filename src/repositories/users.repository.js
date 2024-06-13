import { prisma } from '../utils/prisma.util.js';

export class UsersRepository{

    findUserById =  async (id) => {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id)},
        })

        return user;
    }


}