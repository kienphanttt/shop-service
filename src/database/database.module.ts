import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PROD_DATABASE_CONFIG, DATABASE_CONFIG } from './config';
require('dotenv').config();

console.log('process', process.env.NODE_ENV);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(process.env.NODE_ENV === 'production'
        ? PROD_DATABASE_CONFIG
        : DATABASE_CONFIG),
      type: 'mysql',
      synchronize: true,
      logging: false,
      entities: ['dist/services/**/**/*.entity.js'],
      migrationsTableName: 'migration_histories',
      migrations: ['src/migrations/*.js'],
    } as any),
  ],
})
export class DatabaseModule {}
