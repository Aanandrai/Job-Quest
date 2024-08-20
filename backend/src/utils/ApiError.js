class ApiError extends Error {
    constructor(
        statusCode,
        message="Some thing is wrong",
        stack="",
        errors=[]

    ){

        super(message);
        this.statusCode=statusCode
        this.message=message
        this.success=false
        this.errors=errors
        this.data=null

        if(stack)
            this.stack=stack
        else
            Error.captureStackTrace(this, this.cosntructor)
    }
}

export {ApiError}