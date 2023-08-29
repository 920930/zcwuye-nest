import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, AfterLoad } from 'typeorm';
import { Adminer } from '../../adminer/entities/adminer.entity';
// import { QuType } from '../../app/enum/company.enum';
import { User } from '../../user/entities/user.entity';
import { Room } from '../../room/entities/room.entity';
import { Contract } from '../../contract/entities/contract.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fname: string;

  @Column({ comment: '合同抬头编号' })
  bm: string;

  @Column({ comment: '栋' })
  dong: number;

  @Column({ comment: '区' })
  qu: number;

  // @Column({ type: 'enum', enum: QuType, default: QuType.NUM, comment: '区类型 1数字区 2字母区 3数字字母区 4楼区' })
  // qutype: QuType;

  @Column({ default: '', comment: '区类型 1数字区 2字母区 3数字字母区 4楼区 5特区' })
  qutype: string;

  @Column({ type: 'tinyint', default: 0, comment: '区增量长度,(例 楼 2 即最多只有2楼) (例 字母数字3 则最多 A3 B3)' })
  qulen: number;

  @Column({ default: true })
  state: boolean;

  @ManyToMany(() => Adminer, (adminer) => adminer.companies)
  @JoinTable()
  adminers: Adminer[];

  @ManyToMany(() => User, (user) => user.companies)
  @JoinTable()
  users: User[];

  @OneToMany(() => Room, (room) => room.company)
  rooms: Room[];

  @OneToMany(() => Contract, (contract) => contract.company)
  contract: Contract[];

  @AfterLoad()
  afterLoad() {
    if (this.qutype) {
      const data = this.qutype.length > 1 ? this.qutype.split('-') : [this.qutype];
      this.qutype = data.map((item) => Number(item)) as unknown as string;
    }
  }
}
