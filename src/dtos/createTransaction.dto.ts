import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  sendCurrencyId: string;

  @IsString()
  @IsNotEmpty()
  receivedCurrencyId: string;

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
