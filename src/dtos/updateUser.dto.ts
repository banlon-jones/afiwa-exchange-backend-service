import { IsNotEmpty, IsString } from 'class-validator';

class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
  @IsNotEmpty()
  @IsString()
  displayName: string;
}

export default UpdateUserDto;
