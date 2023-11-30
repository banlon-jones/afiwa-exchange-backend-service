import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsService } from '../../services/transactions/transactions.service';
import UpdataTransactionStatus from '../../dtos/updateTransaction';
import { EntityValidator } from '../../utils/entityValidator';
@ApiTags('transactions')
@Controller('api/')
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly entityValidation: EntityValidator,
  ) {}
  @Get('protected/transactions/all')
  public async getAllTransactions() {
    return await this.transactionService.getAllTransactions();
  }

  @Get('protected/transactions/:id')
  public async getTransactionById(@Param('id') id: string) {
    return await this.entityValidation.getTransactionById(id);
  }

  @Put('protected/transactions/:id')
  public async updateTransaction(
    @Param('id') id: string,
    @Body() status: UpdataTransactionStatus,
  ) {
    return await this.transactionService.updateTransactionStatus(
      status.status,
      id,
    );
  }
}
