import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
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

  @Column({ comment: '号' })
  num: string;

  @ManyToMany(() => Adminer, (type) => type.companies)
  adminers: Adminer[];
}
