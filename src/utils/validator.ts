import { ValidationError } from '@nestjs/common';

export const getMessageValidator = (errors: ValidationError[]) => {
  return errors.map((item) => {
    return Object.keys(item.constraints)
      .map((obj) => item.constraints[obj])
      .join(',');
  });
};
