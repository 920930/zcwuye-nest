import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Contract } from '../../contract/entities/contract.entity';
import { CostType } from '../../costype/entities/costype.entity';
import { Adminer } from '../../adminer/entities/adminer.entity';
// 收费项目
@Entity()
export class Cost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ comment: '开始时间' })
  start: string;

  @Column({ comment: '结束时间' })
  end: string;

  @Column({ comment: '备注说明' })
  desc: string;

  @CreateDateColumn()
  createAt: Date;

  @ManyToOne(() => Contract, (contract) => contract.costs)
  contract: Contract;

  @ManyToOne(() => CostType, (costype) => costype.costs)
  costype: CostType;

  @ManyToOne(() => Adminer, (adminer) => adminer.costs)
  adminer: Adminer;
}
