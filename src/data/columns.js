import React, { useState, useMemo, createContext, useContext } from 'react';

const initColumns = {
  'column-1': {
    id: `column-1`,
    title: `Items`,
    taskIds: [`task-1`, `task-2`, `task-3`, `task-4`],
  },
};

const ColumnsContext = createContext();

function useColumns() {
  const context = useContext(ColumnsContext);
  if (!context)
    throw new Error('useColumns must be used with a ColumnsProvider');
  return context;
}

function ColumnsProvider(props) {
  const [columns, setColumns] = useState(initColumns);
  const value = useMemo(() => [columns, setColumns], [columns]);
  return <ColumnsContext.Provider value={value} {...props} />;
}

export { ColumnsProvider, useColumns };
