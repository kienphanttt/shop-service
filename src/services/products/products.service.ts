import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetProductsDto } from './dto/get-products.dto';
import { Product } from './entity/product.entity';
import { GetProductsResponse } from './interfaces/get-products.response';
import * as fs from 'fs';
import { ProductDetails } from '../product-details/entity/product-details.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(ProductDetails)
    private productsDetailsRepository: Repository<Product>,
  ) {}

  async createProduct(
    dto: { name: string; description: string; quantity: number; size: string },
    files: { images: Express.Multer.File[]; thumb_nail: Express.Multer.File },
  ) {
    const thumbNail = files.thumb_nail[0];

    const thumNailPath = `public/data/images/${
      Date.now() + '-' + thumbNail.originalname
    }` as string;

    fs.writeFileSync(thumNailPath, thumbNail.buffer);

    const product = await this.productsRepository.save({
      name: dto.name,
      description: dto.description,
      thumbNail: thumNailPath,
    });

    const productDetails = [];

    files.images.map((item) => {
      const image = `public/data/images/${
        Date.now() + '-' + item.originalname
      }`;
      fs.writeFileSync(image, item.buffer);
      const details = {
        product: product.id,
        size: dto.size,
        quantity: Number(dto.quantity),
      };

      productDetails.push(details);
    });
    await this.productsDetailsRepository.save(productDetails);

    return {
      status: 200,
      message: 'Product saved',
    };
  }

  async getProducts(dto: GetProductsDto): Promise<GetProductsResponse> {
    const skipProductNumbers = dto.limit * dto.page - 1;

    const products = await this.productsRepository.find({
      skip: dto.page <= 1 ? 0 : skipProductNumbers,
      take: dto.limit,
      cache: true,
    });

    return {
      status: 200,
      products,
    };
  }

  async deleteProduct(id: number) {
    await this.productsRepository.delete(id);
    return {
      status: 200,
      message: 'Product deleted',
    };
  }
}
