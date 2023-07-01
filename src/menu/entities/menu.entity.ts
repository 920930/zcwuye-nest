import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, AfterLoad, JoinColumn } from 'typeorm';
import { TMenu } from '../../app/enum/menu.type';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '路径' })
  path: string;

  @Column({
    type: String,
  })
  name: string;

  @Column({ type: 'simple-json' })
  meta: TMenu;

  @Column({ type: 'simple-array' })
  company: number[];

  @ManyToOne(() => Menu, (menu) => menu.children)
  parent: Menu;

  @OneToMany(() => Menu, (menu) => menu.parent)
  children: Menu[];

  @Column({
    default: null,
  })
  parentId: number;

  @AfterLoad()
  afterLoad() {
    this.company = this.company.map((item) => item - 0);
    this.meta.roles = typeof this.meta.roles === 'string' ? JSON.parse(this.meta.roles) : this.meta.roles;
  }
}
