import bcryptjs from 'bcryptjs'



export class BcryptAdapter {


    

    public static hash(password: string) {

        const salt = bcryptjs.genSaltSync();

        return bcryptjs.hashSync(password, salt)
    }

    public static compare(password:string, hashPassword: string){

        return bcryptjs.compareSync(password, hashPassword);

    }

};