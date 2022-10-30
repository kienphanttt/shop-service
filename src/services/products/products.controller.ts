import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('add')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 5 },
      { name: 'thumb_nail', maxCount: 1 },
    ]),
  )
  uploadFile(
    @Body()
    dto: { name: string; description: string; quantity: number; size: string },
    @UploadedFiles()
    files: { images: Express.Multer.File[]; thumb_nail: Express.Multer.File },
  ) {
    return this.productsService.createProduct(dto, files);
  }

  @Get('id/:id')
  getProductDetails(@Param('id', new ParseIntPipe()) id: number) {
    return this.productsService.getProductDetails(id);
  }

  @Get('all')
  getProducts(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.productsService.getProducts({ page, limit });
  }

  @Delete()
  deleteProduct(@Query('id', new ParseIntPipe()) id: number) {
    return this.productsService.deleteProduct(id);
  }
}
