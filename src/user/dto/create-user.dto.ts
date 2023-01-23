import { IsEmail, IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { Boolean } from 'src/enum/enum.boolean';

export class CreateUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  // @IsInt()
  // @IsEnum(Boolean)
  // gender: number;

  @IsNotEmpty()
  @IsInt()
  code: string;
}
