import { BaseModel } from 'src/base/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: '', type: 'text' })
  full_name: string;

  @Column({ default: '', type: 'text' })
  first_name: string;

  @Column({ default: '', type: 'text' })
  last_name: string;

  @Column({ nullable: true, type: 'date' })
  birthday: string;

  @Column({ default: '', type: 'text' })
  phone: string;

  @Column({ default: '', type: 'text' })
  password: string;

  @Column({ default: '', type: 'text', unique: true })
  email: string;

  @Column({ default: '', type: 'text' })
  avatar: string;

  @Column({ default: '', type: 'text' })
  live_at: string;

  @Column({ default: '', type: 'text' })
  ward: string;

  @Column({ default: '', type: 'text' })
  province: string;

  @Column({ default: '', type: 'text' })
  district: string;

  @Column({ default: 0, type: 'int' })
  gender: number;

  @Column({ default: '', type: 'text' })
  story: string;

  @Column({ default: '', type: 'text' })
  thumbnail: string;

  @Column({ default: '', type: 'text' })
  access_token: string;

  @Column({ default: '', type: 'text' })
  search: string;

  create_at: string;
  update_at: string;
}
