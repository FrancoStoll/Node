import { BcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";




export class AuthService {


    // DI
    constructor() { }



    public async registerUser(registerUserDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if (existUser) throw CustomError.badRequest('Email already exist');

        try {
            const user = new UserModel(registerUserDto);


            // Encriptar la contraseña
            user.password = BcryptAdapter.hash(registerUserDto.password);

            await user.save();
            // JWT <------- auth

            // Email de confirmación

            const { password, ...userEnity } = UserEntity.fromObject(user);

            return {
                user: userEnity,
                token: 'ABC'
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    public async loginUser(loginUserDto: LoginUserDto) {

        const existUser = await UserModel.findOne({ email: loginUserDto.email });

        if (!existUser) throw CustomError.badRequest('User not exist');

        const comparePassword = BcryptAdapter.compare(loginUserDto.password, existUser.password);

        if (!comparePassword) throw CustomError.badRequest('Password incorrect');

        const { password, ...userEntity } = UserEntity.fromObject(existUser);

        const token = await JwtAdapter.generateToken({id: existUser.id, email: existUser.email});
        if(!token) throw CustomError.internalServer('Error while creating jwt');

        return {
            user: userEntity,
            token: token,
        }
    }
}