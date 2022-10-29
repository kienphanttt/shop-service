import { Product } from 'src/services/products/entity/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductDetails extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  product: number;
  @Column()
  size: string;
  @Column()
  quantity: number;
}
