import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, AfterLoad, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Room } from '../../room/entities/room.entity';
import { Company } from '../../company/entities/company.entity';
// 合同
@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '店铺名称' })
  name: string;

  @Column({ comment: '合同编号' })
  bianma: string;

  @Column({
    length: 500,
  })
  yyzz?: string;

  @Column()
  oldRooms?: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @ManyToOne(() => User, (user) => user.contracts)
  user: User;

  @OneToMany(() => Room, (room) => room.contract)
  rooms: Room[];

  @ManyToOne(() => Company, (company) => company.contract)
  company: Company;

  @AfterLoad()
  afterLoad() {
    // this.yyzz = this.yyzz.split(',') as unknown as string;
  }

  @BeforeInsert()
  beforeInsert() {
    if (this.rooms.length) {
      this.oldRooms = oldRoomsFn(this.rooms);
    }
  }

  @BeforeUpdate()
  beforeUpdate() {
    if (this.rooms.length) {
      this.oldRooms = oldRoomsFn(this.rooms);
    }
  }
}

const oldRoomsFn = (rooms: Room[]) => {
  const str = [];
  rooms.forEach((rom) => {
    str.push(`${rom.dong ? `${rom.dong}栋` : ''}${rom.qu ? rom.qu : ''}${rom.num}`);
  });
  return str.join(',');
};
