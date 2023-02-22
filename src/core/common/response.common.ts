import { HttpException, Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class Go {
  constructor() { }

  error({
    error,
    message,
    status,
  }: {
    error?: any;
    message: string;
    status: any;
  }): HttpException {
    throw new HttpException({ message, error, success: false }, status);
  }
}


/**
 * Error when password doesnot match
 * @date 2023-02-23
 * @returns {any}
 */
export function passwordNotMatchedError(): HttpException {
  return new Go().error({
    message: `Password doesnot matched`,
    status: HttpStatus.FORBIDDEN,
  });
}

/**
 * Error when email already exists
 * @date 2023-02-23
 * @param {any} email:string
 * @returns {any}
 */
export function emailExistsError(email: string): HttpException {
  return new Go().error({
    message: `${email} already exists`,
    status: HttpStatus.NOT_FOUND,
  });
}

/**
 * Error when email not found
 * @date 2023-02-23
 * @param {any} email:string
 * @returns {any}
 */
export function emailNotFoundError(email: string): HttpException {
  return new Go().error({
    message: `${email} not found`,
    status: HttpStatus.NOT_FOUND,
  });
}