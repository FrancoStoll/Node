




export class CustomError extends Error {


    constructor(
        public readonly statusCode: number,
        public readonly message: string,
    ) {
        super(message);
    }


    public static badRequest(message: string) {
        return new CustomError(400, message);
    }

    public static unAuthorized(message: string) {
        return new CustomError(401, message);
    }
    public static forbidden(message: string) {
        return new CustomError(403, message);
    }
    public static notFound(message: string) {
        return new CustomError(404, message);
    }
    public static internalServer(message: string) {
        return new CustomError(500, message);
    }

}