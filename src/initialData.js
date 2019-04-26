const initialData = {
  menus: {
    '0001': {
      id: `0001`,
      name: `Main Menu`,
      description: `Order Here`,
      buttons: [`Breakfast`, `Lunch`, `Dinner`],
      subSettings: [`content`, `media`, `template`],
    },
    '0002': {
      id: `0002`,
      name: `Breakfast`,
      description: `Order your breakfast here`,
      buttons: [`eggs`, `ham`, `french toast`],
      subSettings: [`content`, `media`, `template`],
    },
    '0003': {
      id: `0003`,
      name: `Lunch`,
      description: `Order your lunch here`,
      buttons: [`sandwich`, `salad`, `fruit`],
      subSettings: [`content`, `media`, `template`],
    },
    '0004': {
      id: `0004`,
      name: `Dinner`,
      description: `Order your dinner here`,
      buttons: [`steak`, `burrito`, `shawarma`],
      subSettings: [`content`, `media`, `template`],
    },
  },
  columns: {
    'column-1': {
      id: `column-1`,
      title: `Menus`,
      menuIds: [`0001`, `0002`, `0003`, `0004`],
    },
  },
  // facilitate reordering of the column
  columnOrder: [`column-1`],
};

export { initialData };
