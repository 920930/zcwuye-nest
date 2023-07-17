import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Adminer } from '../../adminer/entities/adminer.entity';
import { QuType } from '../../app/enum/company.enum';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ comment: '栋' })
  dong: string;

  @Column({ comment: '区' })
  qu: string;

  @Column({ type: 'enum', enum: QuType, default: QuType.NUM, comment: '区类型' })
  qutype: QuType;

  @Column({ default: true })
  state: boolean;

  @ManyToMany(() => Adminer, (adminer) => adminer.companies)
  @JoinTable()
  adminers: Adminer[];

  @ManyToMany(() => User, (user) => user.companies)
  @JoinTable()
  users: User[];
}
