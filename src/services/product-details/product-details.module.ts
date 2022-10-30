import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from './entity/product-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDetail])],
})
export class ProductDetailsModule {}
