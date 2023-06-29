import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RoleType } from '../../app/enum/role.enum';
import { Adminer } from '../../adminer/entities/adminer.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.CAIWU, comment: '角色英文标识' })
  name: RoleType;

  @Column({ comment: '角色中文标识' })
  title: string;

  @OneToMany(() => Adminer, (adminer) => adminer.role)
  adminers: Adminer[];
}
