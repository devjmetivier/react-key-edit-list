import React, { useState, useMemo, createContext } from 'react';

const initColumns = {
  'column-1': {
    id: `column-1`,
    title: `Items`,
    taskIds: [`task-1`, `task-2`, `task-3`, `task-4`],
  },
};

const ColumnsContext = createContext();

function ColumnsProvider(props) {
  const [columns, updateColumns] = useState(initColumns);
  const value = useMemo(() => [columns, updateColumns], [columns]);
  return <ColumnsContext.Provider value={value} {...props} />;
}

export { ColumnsContext, ColumnsProvider };
