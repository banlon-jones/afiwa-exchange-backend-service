import { BaseEntity } from './abstract-entity';
import { Column, Entity } from 'typeorm';
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
}
