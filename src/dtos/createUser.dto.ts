import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
  @ApiProperty()
  phoneNumber?: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
  @ApiProperty()
  displayName?: string;
}

export default CreateUserDto;
