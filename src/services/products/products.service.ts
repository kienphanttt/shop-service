import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetProductsDto } from './dto/get-products.dto';
import { Product } from './entity/product.entity';
import { GetProductsResponse } from './interfaces/get-products.response';
import { ProductDetail } from '../product-details/entity/product-details.entity';
import { ProductImages } from '../product-images/entity/product-images.entity';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(ProductImages)
    private productsImagesRepository: Repository<ProductImages>,
    @InjectRepository(ProductDetail)
    private productsDetailsRepository: Repository<ProductDetail>,
  ) {}

  async createProduct(
    dto: { name: string; description: string; price: number },
    files: { images: Express.Multer.File[]; thumb_nail: Express.Multer.File },
  ) {
    const thumbNail = files.thumb_nail[0];

    const thumNailPath = `data/images/${
      Date.now() + '-' + thumbNail.originalname
    }` as string;

    fs.writeFileSync(thumNailPath, thumbNail.buffer);

    const product = await this.productsRepository.save({
      name: dto.name,
      description: dto.description,
      thumbNail: thumNailPath,
      price: dto.price,
    });

    const productDetails = [];
    const productImages = [];

    files.images.map((item) => {
      const image = `data/images/${Date.now() + '-' + item.originalname}`;
      fs.writeFileSync(image, item.buffer);

      const images = {
        product: product.id,
        image,
      };
      productImages.push(images);
    });

    [
      { size: 'M', quantity: 5 },
      { size: 'S', quantity: 10 },
      { size: 'L', quantity: 20 },
    ].map((item) => {
      const details = {
        product: product.id,
        size: item.size,
        quantity: Number(item.quantity),
      };
      productDetails.push(details);
    });

    await Promise.all([
      this.productsDetailsRepository.save(productDetails),
      this.productsImagesRepository.save(productImages),
    ]);

    return {
      status: 200,
      message: 'Product saved',
    };
  }

  async getProductDetails(id: number) {
    const product = await this.productsRepository.findOneBy({
      id,
    });

    if (product == null) throw new BadRequestException('Invalid product id');

    const [details, images] = await Promise.all([
      this.productsDetailsRepository.find({
        where: {
          product: {
            id: id,
          },
        },
        cache: true,
      }),
      this.productsImagesRepository.find({
        where: {
          product: {
            id: product.id,
          },
        },
        cache: true,
      }),
    ]);

    return {
      status: 200,
      product: {
        ...product,
        details,
        images,
      },
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
