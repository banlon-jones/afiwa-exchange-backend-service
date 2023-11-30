import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  displayName: string;
}

export default CreateUserDto;
