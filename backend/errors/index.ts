class BadRequestError extends Error{
    message = "";
    statusCode = 400
    constructor(message:string,statusCode=400){
        super(message);
        this.message = message;
        this.statusCode= statusCode
    }
}

export {BadRequestError}