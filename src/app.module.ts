import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAppService } from './services/firebase-app/firebase-app.service';
import { PreAuthMiddleware } from './middlewares/pre-auth/pre-auth.middleware';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { CurrencyService } from './services/currency/currency.service';
import { CurrencyController } from './controllers/currency/currency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CurrencyEntity } from './Entities/currency.entity';
import { TransactionsController } from './controllers/transactions/transactions.controller';
import { TransactionsService } from './services/transactions/transactions.service';
import UserEntity from './Entities/user.entity';
import TransactionEntity from './Entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'afiwa-db',
      entities: [UserEntity, CurrencyEntity, TransactionEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([UserEntity, CurrencyEntity, TransactionEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [
    AppController,
    UserController,
    CurrencyController,
    TransactionsController,
  ],
  providers: [
    AppService,
    FirebaseAppService,
    UserService,
    CurrencyService,
    TransactionsService,
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(PreAuthMiddleware).forRoutes({
      path: '/api/protected/*',
      method: RequestMethod.ALL,
    });
  }
}

/*{
  type: 'mysql',
    host: 'dev-db.c4wcwi0fvlx4.us-east-1.rds.amazonaws.com',
  username: 'admin',
  password: 'ghakanyuy',
  database: 'afiwa-dev',
}*/
