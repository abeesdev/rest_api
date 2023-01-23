import { BaseModel } from 'src/base/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'auth',
})
export class AuthEntity extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'int',
    unique: true,
  })
  user_id: number;

  @Column({
    type: 'text',
    default: '',
  })
  refresh_token: string;

  create_at: string;
  update_at: string;
}
