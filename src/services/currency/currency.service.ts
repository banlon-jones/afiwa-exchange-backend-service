import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from '../../dtos/createCurrency.dto';
import { CurrencyEntity } from '../../Entities/currency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private currencyRepository: Repository<CurrencyEntity>,
  ) {}

  async create(createCurrencyDto: CreateCurrencyDto): Promise<any> {
    const currency: CurrencyEntity = {
      wallet: createCurrencyDto.wallet,
      logo: createCurrencyDto.logo,
      name: createCurrencyDto.name,
      rate: createCurrencyDto.rate,
    };
    try {
      return await this.currencyRepository.save(currency);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  public getAllCurrencies(): Promise<any> {
    return this.currencyRepository.find();
  }
  public async deleteCurrency(currencyId: string): Promise<any> {
    try {
      await this.currencyRepository.delete(currencyId);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateCurrency(id: string, createCurrency: CreateCurrencyDto) {
    try {
      await this.currencyRepository.update(id, createCurrency);
      return this.currencyRepository.findOneBy({ id });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
