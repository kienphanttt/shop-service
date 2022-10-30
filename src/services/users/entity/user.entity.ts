import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../const';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: null, select: false })
  refreshToken: string;

  @Column({ nullable: true, default: Roles.USER })
  role: string;
}
