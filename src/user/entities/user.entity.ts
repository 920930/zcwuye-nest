import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, Unique } from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { Contract } from 'src/contract/entities/contract.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true, comment: '身份证号' })
  card: string;

  @Column({ default: true })
  state: boolean;

  @OneToMany(() => Contract, (contract) => contract.user)
  contracts: Contract[];

  @ManyToMany(() => Company, (company) => company.users)
  companies: Company[];
}
