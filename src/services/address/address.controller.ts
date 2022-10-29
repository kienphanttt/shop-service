import { Body, Controller, Post } from '@nestjs/common';
import { CreateAddressDto } from './dto/create.dto';

@Controller('address')
export class AddressController {
  constructor() {}

  @Post('add-new')
  addNew(@Body() dto: CreateAddressDto) {
    return;
  }
}
