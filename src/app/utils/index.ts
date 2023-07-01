import type { Menu } from '../../menu/entities/menu.entity';

export const menuTrees = (menus: Menu[]) => {
  const parent = menus.filter((item) => !item.parent),
    children = menus.filter((item) => item.parent);

  const toMenus = (parent: Menu[], children: Menu[]) => {
    children.forEach((c, i) => {
      parent.forEach((p, pi) => {
        if (p.id === c.parent.id) {
          p.children ? p.children.push(c) : (p.children = [c]);
        } else {
          c.parent && toMenus([c.parent], c.parent);
        }
      });
    });
  };
  toMenus(parent, children);
  return parent;
};
