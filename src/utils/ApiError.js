class ApiError extends Error{
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = "" //statck
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if(stack){ //statck
            this.stack = stack //statck
        }else {
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}