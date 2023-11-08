class Status {
    constructor(httpStatus, errorCode, message, object) {
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.message = message;
        this.object = object;
    }   
}

module.exports = Status;