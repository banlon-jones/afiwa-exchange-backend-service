import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import TransactionEntity from '../../Entities/transaction.entity';
import { Status } from '../../constants/status';
import CreateTransactionDto from '../../dtos/createTransaction.dto';
import { EntityValidator } from '../../utils/entityValidator';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    private dataSource: DataSource,
    private entityValidator: EntityValidator,
  ) {}

  public async getAllTransactions() {
    return await this.transactionRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  public async updateTransactionStatus(status: Status, transactionId: string) {
    try {
      return await this.transactionRepository.update(transactionId, {
        status: status,
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  public async createTransaction(
    transactionDetails: CreateTransactionDto,
    email: string,
  ) {
    try {
      const rate = await this.convertCurrency(
        transactionDetails.to,
        transactionDetails.from,
      );
      const user = await this.entityValidator.getUserByEmail(email);
      const transaction: TransactionEntity = {
        amount: transactionDetails.amount,
        email: transactionDetails.email,
        exchangeRate: String(rate),
        from: transactionDetails.from,
        status: Status.pending,
        to: transactionDetails.to,
        receivedAmount: String(rate * transactionDetails.amount),
        transactionId: String(Math.floor(Math.random() * Date.now())),
        user: user,
        walletAddress: transactionDetails.walletAddress,
        walletName: transactionDetails.walletName,
      };
      return this.transactionRepository.save(transaction);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async convertCurrency(to: string, from: string) {
    const toCurrency = await this.entityValidator.getCurrency(to);
    const fromCurrency = await this.entityValidator.getCurrency(from);
    return fromCurrency.rate / toCurrency.rate;
  }
}
