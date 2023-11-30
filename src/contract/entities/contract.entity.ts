import { Entity, PrimaryGeneratedColumn, Column, VirtualColumn, ManyToOne, OneToMany, AfterLoad, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Room } from '../../room/entities/room.entity';
import { Company } from '../../company/entities/company.entity';
import * as fs from 'fs';
import * as path from 'path';

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
    default: null,
  })
  yyzz?: string | null;

  @Column({
    default: null,
  })
  oldRooms?: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column({
    comment: '合同状态',
    default: true,
  })
  state: boolean;

  @ManyToOne(() => User, (user) => user.contracts)
  user: User;

  @OneToMany(() => Room, (room) => room.contract)
  rooms: Room[];

  @ManyToOne(() => Company, (company) => company.contract)
  company: Company;

  @AfterLoad()
  async afterLoad() {
    if (this.yyzz) {
      const file = fs.readFileSync(path.resolve(`.env.${process.env.NODE_ENV}`)).toLocaleString();
      const arr = file.split('\r\n').find((item) => item.startsWith('HOST_SERVICE'));
      const host = arr.split('=')[1];
      this.yyzz = this.yyzz
        .split(',')
        .map((item) => `${host}/${item}`)
        .join(',');
    }
  }

  @BeforeInsert()
  beforeInsert() {
    if (this.rooms && this.rooms.length) {
      this.oldRooms = oldRoomsFn(this.rooms);
    }
  }

  @BeforeUpdate()
  beforeUpdate() {
    if (this.rooms && this.rooms.length) {
      this.oldRooms = oldRoomsFn(this.rooms);
      this.state = true;
    } else {
      this.state = false;
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
