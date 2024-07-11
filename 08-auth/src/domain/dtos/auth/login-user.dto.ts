import { regularExps } from "../../../config";



export class LoginUserDto {


    private constructor(
        public readonly email: string,
        public readonly password: string,
    ) {

    }

    public static create(options: { [key: string]: any }): [string?, LoginUserDto?] {

        const { email, password } = options;
        if (!email) return ['Name is required'];
        if(!regularExps.email.test(email)) return ['Email valid is required']
        if (!password) return ['Password is required'];

        return [undefined, new LoginUserDto(email, password)]
    }


}