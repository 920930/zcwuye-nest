import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, AfterLoad } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Room } from '../../room/entities/room.entity';
// 合同
@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '店铺名称' })
  name: string;

  @Column({
    length: 500,
  })
  yyzz?: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @ManyToOne(() => User, (user) => user.contracts)
  user: User;

  @OneToMany(() => Room, (room) => room.contract)
  rooms: Room[];

  @AfterLoad()
  afterLoad() {
    // this.yyzz = this.yyzz.split(',') as unknown as string;
  }
}
