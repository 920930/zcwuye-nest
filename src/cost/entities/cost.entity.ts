import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, AfterLoad, UpdateDateColumn } from 'typeorm';
import { Contract } from '../../contract/entities/contract.entity';
import { Costype } from '../../costype/entities/costype.entity';
import { Adminer } from '../../adminer/entities/adminer.entity';

import * as dayjs from 'dayjs';
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

  @ManyToOne(() => Contract, (contract) => contract.costs)
  contract: Contract;

  @ManyToOne(() => Costype, (costype) => costype.costs)
  costype: Costype;

  @ManyToOne(() => Adminer, (adminer) => adminer.costs)
  adminer: Adminer;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @AfterLoad()
  afterLoad() {
    if (this.price) {
      this.price = +this.price;
    }
    // 减去8小时，这是因为typeorm设定了中国时区，daysj默认中国市区+8小时
    this.createAt = dayjs(this.createAt).subtract(8, 'hour').format('YYYY-MM-DD HH:mm') as unknown as Date;
  }
}
