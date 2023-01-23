/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpStatus } from '@nestjs/common';

export class BaseResponse {
  code?: number;
  message?: string;
  data?: any;
  constructor({ code = HttpStatus.OK, message = 'success', data }: BaseResponse) {
    this.code = code;
    this.message = message;
    data && (this.data = data);
  }
}
