const initialData = {
  tasks: {
    '0001': {
      id: `0001`,
      name: `apple`,
      description: `Keeps the doctor away`,
      attributes: [`red`, `green`, `golden`],
    },
    '0002': {
      id: `0002`,
      name: `orange`,
      description: `You gotta peel it to believe it`,
      attributes: [`orange`, `juicy`, `Vitamin-C`],
    },
    '0003': {
      id: `0003`,
      name: `banana`,
      description: `PEEL THE BANANA`,
      attributes: [`yellow`, `berry`, `potassium`],
    },
    '0004': {
      id: `0004`,
      name: `pear`,
      description: `Not your average jeans`,
      attributes: [`greenish`, `pomaceous`, `sacred`],
    },
  },
  columns: {
    'column-1': {
      id: `column-1`,
      title: `Items`,
      taskIds: [`0001`, `0002`, `0003`, `0004`],
    },
  },
  // facilitate reordering of the column
  columnOrder: [`column-1`],
};

export { initialData };
