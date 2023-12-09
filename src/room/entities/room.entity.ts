import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { Contract } from '../../contract/entities/contract.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dong: number;

  @Column()
  qu: string;

  @Column()
  num: string;

  @ManyToOne(() => Company, (company) => company.rooms)
  company: Company;

  @ManyToOne(() => Contract, (contract) => contract.rooms)
  contract: Contract;
}
