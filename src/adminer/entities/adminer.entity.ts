import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { hash } from 'argon2';
import { Company } from '../../company/entities/company.entity';
import { Role } from '../../role/entities/role.entity';
import { Cost } from '../../cost/entities/cost.entity';

@Entity()
export class Adminer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  phone: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    default: '',
  })
  avatar: string;

  @ManyToMany(() => Company, (company) => company.adminers)
  companies: Company[];

  @ManyToOne(() => Role)
  role: Role;

  @OneToMany(() => Cost, (cost) => cost.adminer)
  costs: Cost[];

  @Column({ default: true, comment: '管理员状态 1正常 0离职' })
  state: boolean;

  @BeforeInsert()
  async beforeInsert() {
    this.password = await hash(this.password);
  }

  @BeforeUpdate()
  async beforeUpdate() {
    if (this.password) {
      this.password = await hash(this.password);
    }
  }
}
