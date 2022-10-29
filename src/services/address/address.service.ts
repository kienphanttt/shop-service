import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/shared/common/interfaces';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create.dto';
import { Address } from './entity/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}

  async addNew(dto: CreateAddressDto): Promise<ApiResponse> {
    await this.addressRepository.save(dto);

    return {
      code: 201,
      message: 'Address saved',
    };
  }

  async deleteAddress(id: number): Promise<ApiResponse> {
    await this.addressRepository.delete(id);
    return {
      code: 200,
      message: 'Address deleted',
    };
  }
}
