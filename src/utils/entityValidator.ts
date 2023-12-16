import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '../Entities/user.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import TransactionEntity from '../Entities/transaction.entity';
import { CurrencyEntity } from '../Entities/currency.entity';

export class EntityValidator {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(CurrencyEntity)
    private currencyRepository: Repository<CurrencyEntity>,
  ) {}

  public async getUserById(id: string): Promise<any> {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  public getUserByEmail(email: string): any {
    return this.userRepository.findOneBy({ email });
  }

  public async getTransactionById(id: string) {
    try {
      return await this.transactionRepository.findOneBy({ id });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  public getCurrency(currencyId: string): Promise<any> {
    try {
      return this.currencyRepository.findOneBy({ id: currencyId });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
