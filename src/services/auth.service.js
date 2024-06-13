import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MESSAGES } from '../constants/message.constant.js';
import { AuthRepository } from '../repositories/auth.repository.js';
import { HASH_SALT_ROUNDS, ACCESS_TOKEN_EXPIRES_IN } from '../constants/auth.constant.js';
         
         //회원가입 로직
export class AuthService {
    authRepository = new AuthRepository();

    createUser = async (email, password, name) => {
        const existedUser = await this.authRepository.findUserByEmail(email);
        if (existedUser){
            throw new Error(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED)
        }
       
        const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

        const user = await this.authRepository.createUser(email, hashedPassword, name);

        user.password = undefined;

        return {
            email: user.email,
            name: user.name,
          }
        }

    

    signIn = async (email, password) => {
        const user = await this.authRepository.findUserByEmail(email);
        const isPasswordMatched =
            user && bcrypt.compareSync(password, user.password);

            if(!isPasswordMatched){
                throw new Error(MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD)
            }

        const payload = { id: user.id };
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    
        return { accessToken };
    }
}