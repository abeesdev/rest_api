import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AuthEntity]),
    JwtModule.register({
      secret: 'abees',
      signOptions: { expiresIn: '20m' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService],
})
export class UserModule {}
