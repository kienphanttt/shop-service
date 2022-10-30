import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImages } from './entity/product-images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImages])],
})
export class ProductImagesModule {}
