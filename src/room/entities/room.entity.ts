import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  //{ precision: 5, scale: 2 } 显示价格如 19999.23
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column({ type: 'float', precision: 5, scale: 2 })
  area: number;
}
