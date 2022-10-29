import { User } from 'src/services/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: number;

  @Column()
  ward: string;
  @Column()
  district: string;
  @Column()
  details: string;
}
