import { AuthService} from '../services/auth.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';


export class AuthController{
   
    authService = new AuthService();
        
    createUser = async (req, res, next) => {
        try {
          const { email, password, name } = req.body;

          if(!email || !password || !name){
            throw new Error('InvalidParamsError');
          }
            const createdUser = await this.authService.createUser(
                email, password, name
            );
        
 
          return res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
            data: createdUser,
          });
        } catch (error) {
          next(error);
        }
    };

    signInUser = async (req, res, next) => {
        try {
             const { email, password } = req.body;
             const signInUser = await this.authService.signIn(email, password);

            if(!email || !password){
            throw new Error('InvalidParamsError');
          }

            if(!signInUser) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    status: HTTP_STATUS.UNAUTHORIZED,
                    message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
                  });
          }

      
          return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
            data: signInUser,
          });
        } catch (error) {
          next(error);
        }
    }





}

