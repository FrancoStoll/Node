import { BcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { EmailService } from "./email.service";




export class AuthService {


    // DI
    constructor(
        private readonly emailService: EmailService,
    ) { }



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
            await this.sendEmailValidationLink(user.email);

            const { password, ...userEnity } = UserEntity.fromObject(user);

            const token = await JwtAdapter.generateToken({ id: user.id })
            if (!token) throw CustomError.internalServer('Error while creating jwt');
            return {
                user: userEnity,
                token: token
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

        const token = await JwtAdapter.generateToken({ id: existUser.id, });
        if (!token) throw CustomError.internalServer('Error while creating jwt');

        return {
            user: userEntity,
            token: token,
        }
    }


    public async validateEmail(token: string) {

        const payload = await JwtAdapter.validateToken(token);

        if (!payload) throw CustomError.unAuthorized('Invalid token')

        const { email } = payload as { email: string };
        if (!email) throw CustomError.internalServer('Email not in token');

        const user = await UserModel.findOne({ email });
        if (!user) throw CustomError.internalServer('Email not found')
        user.emailValidated = true;
        await user.save();

        return true
    }


    private sendEmailValidationLink = async (email: string) => {

        const token = await JwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internalServer('Error getting token');

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your emal</p>
            <a href="${link}">Validate your email: ${email}</a>
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        }

        const isSet = await this.emailService.sendEmail(options);
        if (!isSet) throw CustomError.internalServer('Error sending email');

        return true

    }
}