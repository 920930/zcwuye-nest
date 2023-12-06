import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Cost } from '../../cost/entities/cost.entity';

// 收费项目
@Entity()
export class Costype {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '费用名称' })
  title: string;

  @Column({ comment: '状态' })
  state: boolean;

  @CreateDateColumn()
  createAt: Date;

  @OneToMany(() => Cost, (cost) => cost.costype)
  costs: Cost[];
}
