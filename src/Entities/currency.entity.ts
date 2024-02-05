import { BaseEntity } from './abstract-entity';
import { Column, Entity } from 'typeorm';
import { Active } from '../constants/active';
@Entity('currency')
export class CurrencyEntity extends BaseEntity {
  @Column()
  name: string;
  @Column()
  logo: string;
  @Column()
  rate: string;
  @Column()
  wallet: string;
  @Column({
    type: 'enum',
    enum: Active,
    default: Active.TRUE,
  })
  active: string;
}
