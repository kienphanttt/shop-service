import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetails } from './entity/product-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDetails])],
})
export class ProductSizeModule {}
