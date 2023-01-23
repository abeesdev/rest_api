import { Response } from 'express';

export const setCookie = <T>(res: Response, val: T, key?: string) => {
  res.cookie(key || 'session', typeof val == 'object' ? JSON.stringify(val) : val);
};
