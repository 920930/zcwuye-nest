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

  @Column({ type: 'decimal', precision: 6, scale: 2, comment: '总面积' })
  area: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, comment: '月租金' })
  price: number;

  @ManyToOne(() => Contract, (contract) => contract.conlists)
  contract: Contract;
}
