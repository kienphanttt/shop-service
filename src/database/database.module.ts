import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: 'localhost',
      database: 'shop_service',
      username: 'root',
      password: 'daikax1xktn',
      synchronize: true,
      logging: false,
      entities: ['dist/services/**/**/*.entity.js'],
      migrationsTableName: 'migration_histories',
      migrations: ['src/migrations/*.js'],
    }),
  ],
})
export class DatabaseModule {}
