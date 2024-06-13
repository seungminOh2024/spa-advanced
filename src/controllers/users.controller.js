import { UsersService } from '../services/user.service.js';
import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js'

export class UsersController{
    usersService = new UsersService();

    getUserData = async(req, res, next) =>{
        try{
            const { data } = req.user;

            const user = await this.usersService.findUserById(data.id);

            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.USERS.READ_ME.SUCCEED,
                data: user});
        } catch(err){
            next(err);
        }
    }
    //내정보조회
   
}