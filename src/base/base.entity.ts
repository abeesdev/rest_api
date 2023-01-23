import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseModel extends BaseEntity {
  @CreateDateColumn()
  create_at: string;

  @UpdateDateColumn()
  update_at: string;
}
