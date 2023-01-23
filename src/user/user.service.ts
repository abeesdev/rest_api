import { MailerService } from '@nestjs-modules/mailer';
import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import argon2 from 'argon2';
import { CustomException } from 'src/utils/httpException';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';
import { BaseResponse } from '../utils/base.response';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { setCookie } from 'src/utils/cookie';
import { UserResponse } from './response/user.response';
import { AuthEntity } from './entities/auth.entity';
import { normalizedString } from 'src/utils/format-search-string';

@Injectable()
export class UserService {
  constructor(
    private readonly cache: CacheService,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>,
    private readonly mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

  mailKey(key: string) {
    return `verify:${key}`;
  }

  async mailer(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000);
    this.cache.store.set(this.mailKey(email), code, 'EX', 60 * 15);

    this.mailerService.sendMail({
      to: email,
      from: 'abeesdevop@gmail.com',
      subject: 'Register ✔',
      template: 'index',
      context: {
        code: code,
        email: email,
      },
    });
    await this.cache.store.del(this.mailKey(email));
  }

  async verifyMail(email: string) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (existUser) {
      throw new CustomException(HttpStatus.CONFLICT, 'User already exists on the system');
    }
    await this.mailer(email);
    return new BaseResponse({});
  }

  async register(body: CreateUserDto) {
    const verifyCode = await this.cache.store.get(this.mailKey(body.email));

    if (!verifyCode || verifyCode != body.code) throw new CustomException(HttpStatus.BAD_REQUEST, 'Invalid code');

    const passwordHash = await argon2.hash(body.password);
    const fullName = body.first_name + ' ' + body.last_name;

    this.userRepository
      .create({
        ...body,
        full_name: fullName,
        password: passwordHash,
        search: normalizedString(fullName),
      })
      .save();

    return new BaseResponse({});
  }

  async login(body: LoginDto, res: Response) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });

    if (!existUser) throw new CustomException(HttpStatus.BAD_REQUEST, 'Invalid email or password!');

    const validPassword = argon2.verify(existUser.password, body.password);
    if (!validPassword) throw new CustomException(HttpStatus.BAD_REQUEST, 'Invalid email or password!');

    const accessToken = this.jwtService.sign({ user_id: existUser.id, sub: existUser.id, company: 'abees' });

    const refreshToken = this.jwtService.sign(
      { user_id: existUser.id, sub: existUser.id, company: 'abees' },
      { expiresIn: '365d' },
    );

    setCookie(res, refreshToken, 'token');

    await this.userRepository.update({ id: existUser.id }, { access_token: accessToken });

    const exitAuth = await this.authRepository.findOne({ where: { user_id: existUser.id } });

    if (exitAuth) {
      await this.authRepository.update({ id: exitAuth.id }, { refresh_token: refreshToken });
    } else {
      await this.authRepository
        .create({
          user_id: existUser.id,
          refresh_token: refreshToken,
        })
        .save();
    }
    return new BaseResponse({
      data: {
        ...new UserResponse(existUser),
        access_token: accessToken,
      },
    });
  }
}
