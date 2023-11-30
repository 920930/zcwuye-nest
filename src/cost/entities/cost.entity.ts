import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CostType } from '../../app/enum/cost.enum';
import { Contract } from '../../contract/entities/contract.entity';
// 收费项目
@Entity()
export class Cost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CostType,
    default: CostType.WUYE,
    comment: '1物业费 2押金 3电费 4水费 5垃圾费 6滞纳金 7保险费 8培训费',
  })
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Contract, (contract) => contract.costs)
  contract: Contract;
}
