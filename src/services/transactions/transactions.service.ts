import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entity/transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async getTransactionByUser(userId: number) {
    const skipTransactionNumbers = 2;

    const transactions = await this.transactionsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      skip: skipTransactionNumbers,
      take: 10,
      cache: 60000,
    });

    return {
      status: 200,
      transactions,
    };
  }

  getListTransactions() {}

  updateTransaction() {}

  exportToExcel() {}
}
