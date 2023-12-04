import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Cost } from '../../cost/entities/cost.entity';

// 收费项目
@Entity()
export class CostType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '费用名称' })
  type: string;

  @Column({ comment: '状态' })
  state: boolean;

  @CreateDateColumn()
  createAt: Date;

  @OneToMany(() => Cost, (cost) => cost.costype)
  costs: Cost[];
}
