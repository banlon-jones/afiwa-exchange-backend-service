import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '../constants/status';

class UpdataTransactionStatus {
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}

export default UpdataTransactionStatus;
