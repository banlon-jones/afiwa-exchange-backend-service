import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import TransactionEntity from '../../Entities/transaction.entity';
import { Status } from '../../constants/status';
import CreateTransactionDto from '../../dtos/createTransaction.dto';
import { EntityValidator } from "../../utils/entityValidator";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    private dataSource: DataSource,
    private entityValidator: EntityValidator,
  ) {}

  public async getAllTransactions() {
    return await this.transactionRepository.find();
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

  public async createTransaction(transactionDetails: CreateTransactionDto) {
    try {
      const transaction: TransactionEntity = {
        email: transactionDetails.email,
        exchangeRate: 0,
        receivedCurrencyId: transactionDetails.receivedCurrencyId,
        sendCurrencyId: transactionDetails.sendCurrencyId,
        status: Status.pending,
        transactionId: String(Math.floor(Math.random() * Date.now())),
        walletAddress: transactionDetails.walletAddress,
        walletName: transactionDetails.walletName,
        user: undefined;
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
