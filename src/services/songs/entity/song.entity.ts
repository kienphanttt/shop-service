import { User } from 'src/services/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'songs' })
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: true, default: null })
  discount: number;

  @Column()
  image: string;

  @Column()
  singer: string;

  @Column()
  country: string;

  @Column()
  type: number;

  @Column()
  isTop100: boolean;

  @Column()
  isRelaxingWeekend: boolean;

  @Column({ nullable: true, default: true })
  status: boolean;

  @Column()
  isNewRelease: boolean;

  @Column()
  category: number;

  @ManyToOne(() => User)
  createdBy: number;

  @ManyToOne(() => User)
  modifiedBy: number;

  @Column({ default: new Date().toString() })
  createdDate: string;

  @Column({ default: new Date().toString() })
  modifiedAt: string;
}
