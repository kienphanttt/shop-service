import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetails } from '../product-details/entity/product-details.entity';
import { Product } from './entity/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductDetails])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
