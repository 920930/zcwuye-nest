import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

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
}
