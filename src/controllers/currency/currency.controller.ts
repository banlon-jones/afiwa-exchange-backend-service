import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateCurrencyDto } from '../../dtos/createCurrency.dto';
import { CurrencyService } from '../../services/currency/currency.service';
import { ApiTags } from '@nestjs/swagger';
import { EntityValidator } from '../../utils/entityValidator';

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

  @Delete('protected/currency/:id')
  public deleteCurrency(@Param('id') id: string) {
    return this.currencyService.deleteCurrency(id);
  }

  @Post('protected/currency')
  public createCurrency(@Body() createCurrency: CreateCurrencyDto): any {
    return this.currencyService.create(createCurrency);
  }

  @Put('protected/currency')
  public updateCurrency(
    @Param('id') id: string,
    @Body() currencyDto: CreateCurrencyDto,
  ) {
    return this.currencyService.updateCurrency(id, currencyDto);
  }
}
