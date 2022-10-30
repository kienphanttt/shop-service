import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from '../product-details/entity/product-details.entity';
import { ProductImages } from '../product-images/entity/product-images.entity';
import { Product } from './entity/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductDetail, ProductImages])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
