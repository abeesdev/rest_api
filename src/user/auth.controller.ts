import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyEmail } from './dto/verify-email.dto';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const data = await this.userService.register(body);
    return data;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) response: Response) {
    const data = await this.userService.login(body, response);
    return data;
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify')
  async verifyEmail(@Body() body: VerifyEmail) {
    const data = await this.userService.verifyMail(body.email);
    return data;
  }
}
