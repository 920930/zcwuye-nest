import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Room } from 'src/room/entities/room.entity';
// 合同
@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '店铺名称' })
  name: string;

  @Column()
  yyzz: string;

  @Column()
  beforeTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(() => User, (user) => user.contracts)
  user: User;

  @OneToMany(() => Room, (room) => room.contract)
  rooms: Room[];
}
