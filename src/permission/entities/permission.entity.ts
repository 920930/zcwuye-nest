import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '权限英文标识' })
  name: string;

  @Column({ comment: '权限中文标识' })
  title: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable({ name: 'role_permisson' })
  roles: Role[];
}
