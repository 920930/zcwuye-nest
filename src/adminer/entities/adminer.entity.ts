import { Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { hash } from 'argon2';
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

  @BeforeInsert()
  async beforeInsert() {
    this.password = await hash(this.password);
  }
}
