"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Exception extends Error {
  constructor(message) {
    super(message);
    this.errorsException = void 0;
    this.errorsException = [];
  }

  hasErrorType(type) {
    for (let k in this.errorsException) {
      if (k == 'error_type' && this.errorsException[k] == type) {
        return true;
      }

      for (let kk in this.errorsException[k]) {
        if (kk == 'error_type' && this.errorsException[k][kk] == type) {
          return true;
        }
      }
    }

    return false;
  }

  getErrors() {
    return this.errorsException;
  }

  setErrors(val) {
    this.errorsException = val;
  }

  getCode() {
    return Exception.BAD_REQUEST;
  }

}

exports.default = Exception;
Exception.BAD_REQUEST = 400;
Exception.UNAUTHORIZED = 401;
Exception.NOT_FOUND = 404;
Exception.UNSUPPORTED_MEDIA_TYPE = 415;
Exception.UNPROCESSABLE_ENTITY = 422;
Exception.TYPE_BAD_REQUEST = 'BAD_REQUEST';
Exception.TYPE_UNAUTHORIZED = 'UNAUTHORIZED';
Exception.TYPE_ACCESS_DENIED = 'ACCESS_DENIED';
Exception.TYPE_EXPIRED_CODE_GRANT = 'EXPIRED_CODE_GRANT';
Exception.TYPE_RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND';
Exception.TYPE_UNSUPPORTED_MEDIA_TYPE = 'UNSUPPORTED_MEDIA_TYPE';
Exception.TYPE_CANNOT_BE_NULL = 'CANNOT_BE_NULL';
Exception.TYPE_INVALID_FORMAT = 'INVALID_FORMAT';
Exception.TYPE_CANNOT_BE_BLANK = 'CANNOT_BE_BLANK';
Exception.TYPE_VALUES_MUST_BE_LOWERCASE = 'VALUES_MUST_BE_LOWERCASE';
Exception.TYPE_MUST_BE_STRING = 'MUST_BE_STRING';
Exception.TYPE_INVALID_FIELDS = 'INVALID_FIELDS';
Exception.TYPE_CONFLICTING_FIELD = 'CONFLICTING_FIELD';
Exception.TYPE_EMAIL_ALREADY_IN_USE = 'EMAIL_ALREADY_IN_USE';
Exception.TYPE_INVALID = 'INVALID';
Exception.TYPE_TAKEN = 'TAKEN';
Exception.TYPE_TOO_SHORT = 'TOO_SHORT';
Exception.TYPE_TOO_LONG = 'TOO_LONG';
Exception.TYPE_EXCLUSION = 'EXCLUSION';
Exception.TYPE_INCLUSION = 'INCLUSION';