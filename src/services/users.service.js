import { UsersRepository } from '../repositories/users.repository.js';

export class UsersService {
    usersRepository = new UsersRepository();

    findUserById = async (userId) => {
        const user = await this.usersRepository.findUserById(userId);



        return{
            userId: user.id,
            name: user.name,  
            role: user.role,      
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }






    }








}
