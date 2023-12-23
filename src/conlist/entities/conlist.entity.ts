import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, AfterLoad, BeforeInsert, BeforeUpdate } from 'typeorm';
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

  @ManyToOne(() => Contract, (contract) => contract.conlists)
  contract: Contract;
}
