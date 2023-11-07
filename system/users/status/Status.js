class Status {
    constructor(httpStatus, errorCode, message) {
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.message = message;
    }   
}

module.exports = Status;