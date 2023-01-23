import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(code: number, message: string) {
    super({ code, message }, code);
  }
}
