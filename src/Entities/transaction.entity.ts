import { Column, Entity, ManyToOne } from 'typeorm';
import { Status } from '../constants/status';
import UserEntity from './user.entity';
import { BaseEntity } from './abstract-entity';

@Entity('transactions')
class TransactionEntity extends BaseEntity {
  @Column({ unique: true })
  transactionId: string;
  @Column()
  from: string;
  @Column()
  to: string;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.pending,
  })
  status: string;

  @Column()
  amount: number;

  @Column('decimal', { precision: 6, scale: 6 })
  exchangeRate: number;

  @Column()
  email: string;

  @Column('decimal', { precision: 6, scale: 6 })
  receivedAmount: number;

  @Column()
  walletAddress: string;

  @Column({ unique: false, nullable: true })
  walletName?: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.transactions)
  user: UserEntity;
}

export default TransactionEntity;
