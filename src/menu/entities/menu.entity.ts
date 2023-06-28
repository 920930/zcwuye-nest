import { Entity, Column, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';
import { TMenu } from '../../app/enum/menu.type';

@Entity()
@Tree('closure-table')
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
  companyIds: number[];

  @TreeChildren()
  children: Menu[];

  @TreeParent()
  parent: Menu;
}
