import { Category } from 'src/services/categories/entity/category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'songs' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mp3Link: string;

  @Column()
  lyrics: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: true })
  discount: number;

  @Column()
  image: string;

  @Column()
  singer: string;

  @Column()
  type: string;

  @OneToOne(() => Category)
  category: number;
}
