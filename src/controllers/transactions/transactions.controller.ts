import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { TransactionsService } from '../../services/transactions/transactions.service';
import UpdataTransactionStatus from '../../dtos/updateTransaction';
import { EntityValidator } from '../../utils/entityValidator';
import { AuthGuard } from '../../guards/auth/auth.guard';
import CreateTransactionDto from '../../dtos/createTransaction.dto';
@ApiTags('transactions')
@Controller('api/')
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly entityValidation: EntityValidator,
  ) {}
  @UseGuards(AuthGuard)
  @Get('protected/transactions/all')
  public async getAllTransactions() {
    return await this.transactionService.getAllTransactions();
  }

  @Get('protected/transactions/:id')
  public async getTransactionById(@Param('id') id: string) {
    return await this.entityValidation.getTransactionById(id);
  }

  @UseGuards(AuthGuard)
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

  @Post('protected/transactions')
  public async createTransaction(
    @Body() transactionDetails: CreateTransactionDto,
    @Req() req: any,
  ) {
    return this.transactionService.createTransaction(
      transactionDetails,
      req.user.email,
    );
  }
}
