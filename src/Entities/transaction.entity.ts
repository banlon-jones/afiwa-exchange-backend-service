import { Column, Entity, ManyToOne } from 'typeorm';
import { Status } from '../constants/status';
import UserEntity from './user.entity';
import { BaseEntity } from './abstract-entity';

@Entity('transactions')
class TransactionEntity extends BaseEntity {
  transactionId: string;
  @Column()
  sendCurrencyId: string;
  @Column()
  receivedCurrencyId: string;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.pending,
  })
  status: string;

  @Column()
  exchangeRate: number;

  @Column()
  email: string;

  @Column()
  walletAddress: string;

  @Column({ unique: false, nullable: true })
  walletName?: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.transactions)
  user: UserEntity;
}

export default TransactionEntity;
