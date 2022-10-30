import { Product } from 'src/services/products/entity/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'product_details' })
export class ProductDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  product: Product;
  @Column()
  size: string;
  @Column()
  quantity: number;
}
