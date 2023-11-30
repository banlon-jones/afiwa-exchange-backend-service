import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from '../constants/roles';
import { BaseEntity } from './abstract-entity';
import TransactionEntity from './transaction.entity';

@Entity('users')
class UserEntity extends BaseEntity {
  uid: string;
  @Column()
  email: string;
  @Column({
    type: 'boolean',
    default: false,
  })
  emailVerified?: boolean;
  @Column()
  phoneNumber: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role?: string;
  @Column()
  name: string;
  @Column({
    type: 'boolean',
    default: false,
  })
  disabled?: boolean;

  @OneToMany(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.user,
  )
  transactions?: TransactionEntity[];
}

export default UserEntity;
