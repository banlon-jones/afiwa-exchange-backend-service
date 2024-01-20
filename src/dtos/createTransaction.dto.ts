import { IsDecimal, IsEmail, IsNotEmpty, IsString } from 'class-validator';

class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

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

export default CreateTransactionDto;
