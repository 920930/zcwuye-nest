import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BeforeInsert } from 'typeorm';
import { hash } from 'argon2';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Adminer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({ default: true })
  state: boolean;

  @ManyToMany(() => Company, (type) => type.adminers)
  companies: Company[];

  @BeforeInsert()
  async beforeInsert() {
    this.password = await hash(this.password);
  }
}
