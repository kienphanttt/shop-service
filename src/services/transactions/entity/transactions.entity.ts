import { Product } from 'src/services/products/entity/product.entity';
import { User } from 'src/services/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  guestId: number;
}
