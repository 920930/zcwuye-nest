import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { RoleType } from '../../app/enum/role.enum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.CAIWU, comment: '角色英文标识' })
  name: RoleType;

  @Column({ comment: '角色中文标识' })
  title: string;
}
