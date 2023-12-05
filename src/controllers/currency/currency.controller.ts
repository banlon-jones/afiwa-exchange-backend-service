import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateCurrencyDto } from '../../dtos/createCurrency.dto';
import { CurrencyService } from '../../services/currency/currency.service';
import { ApiTags } from '@nestjs/swagger';
import { EntityValidator } from '../../utils/entityValidator';
import { AuthGuard } from '../../guards/auth/auth.guard';

@ApiTags('Currency')
@Controller('api/')
export class CurrencyController {
  constructor(
    private currencyService: CurrencyService,
    private entityValidator: EntityValidator,
  ) {}

  @Get('public/currency')
  public getAllCurrency(): any {
    return this.currencyService.getAllCurrencies();
  }
  @Get('public/currency/:id')
  public getCurrency(@Param('id') id: string) {
    return this.entityValidator.getCurrency(id);
  }

  @UseGuards(AuthGuard)
  @Delete('protected/currency/:id')
  public deleteCurrency(@Param('id') id: string) {
    return this.currencyService.deleteCurrency(id);
  }
  @UseGuards(AuthGuard)
  @Post('protected/currency')
  public createCurrency(@Body() createCurrency: CreateCurrencyDto): any {
    return this.currencyService.create(createCurrency);
  }
  @UseGuards(AuthGuard)
  @Put('protected/currency')
  public updateCurrency(
    @Param('id') id: string,
    @Body() currencyDto: CreateCurrencyDto,
  ) {
    return this.currencyService.updateCurrency(id, currencyDto);
  }
}
