import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, AfterLoad } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { Contract } from '../../contract/entities/contract.entity';

@Entity()
export class Conlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column({ comment: '备注说明' })
  desc: string;

  @Column({ type: 'simple-array', comment: '合同图', default: null })
  imgs: string[];

  @ManyToOne(() => Contract, (contract) => contract.conlists)
  contract: Contract;

  @AfterLoad()
  async afterLoad() {
    if (this.imgs) {
      const file = fs.readFileSync(path.resolve(`.env.${process.env.NODE_ENV}`)).toLocaleString();
      const arr = file.split('\r\n').find((item) => item.startsWith('HOST_SERVICE'));
      const host = arr.split('=')[1];
      this.imgs = this.imgs.map((item) => `${host}/${item}`);
    }
  }
}
