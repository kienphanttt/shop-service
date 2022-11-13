import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('add')
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: 'images', maxCount: 5 },
  //     { name: 'thumb_nail', maxCount: 1 },
  //   ]),
  // )
  uploadFile(@Req() req) {
    // console.log('type', typeof files.files);
    console.log('req files', req);
    // return this.productsService.createProduct(
    //   { name: 'test p1', description: 'test p1', price: 500 },
    //   {
    //     images: files.files,
    //     thumbNail: files.files[0],
    //   },
    // );

    // console.log('dto', dto);
    // console.log('files', files);

    return 'w';
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
