import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { RoleType } from '../../app/enum/role.enum';
import { Adminer } from '../../adminer/entities/adminer.entity';
import { Permission } from '../../permission/entities/permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.CAIWU, comment: '角色英文标识' })
  name: RoleType;

  @Column({ comment: '角色中文标识' })
  title: string;

  @ManyToMany(() => Permission, (per) => per.roles)
  permissions: Permission[];

  @OneToMany(() => Adminer, (adminer) => adminer.role)
  adminers: Adminer[];
}
