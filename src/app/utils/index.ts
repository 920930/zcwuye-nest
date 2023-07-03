import type { Menu } from '../../menu/entities/menu.entity';

export const menuTrees = (menus: Menu[]) => {
  const parent = menus.filter((item) => !item.parent),
    children = menus.filter((item) => item.parent);

  const toMenus = (parent: Menu[], children: Menu[]) => {
    parent.forEach((p) => {
      children.forEach((c, i) => {
        if (p.id === c.parent.id) {
          const _c: Menu[] = JSON.parse(JSON.stringify(children));
          _c.splice(i, 1);
          toMenus([c], _c);
          p.children ? p.children.push(c) : (p.children = [c]);
        }
      });
    });
  };
  toMenus(parent, children);
  return parent;
};
