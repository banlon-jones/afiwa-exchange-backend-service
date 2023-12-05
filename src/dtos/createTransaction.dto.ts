import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  walletAddress: string;

  @IsNotEmpty()
  @IsString()
  walletName: string;
}

export default CreateUserDto;
