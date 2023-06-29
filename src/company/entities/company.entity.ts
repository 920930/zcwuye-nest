import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Adminer } from '../../adminer/entities/adminer.entity';

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

  @ManyToMany(() => Adminer, (adminer) => adminer.companies)
  @JoinTable()
  adminers: Adminer[];
}
