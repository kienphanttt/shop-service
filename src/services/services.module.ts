import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ProductsModule, TransactionsModule],
})
export class ServicesModule {}
