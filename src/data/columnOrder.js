import React, { useState, useMemo, createContext } from 'react';

// facilitate reordering of the column
const initColumnOrder = {
  columnOrder: [`column-1`],
};

const ColumnOrderContext = createContext();

function ColumnOrderProvider(props) {
  const [columnOrder, updateColumnOrder] = useState(initColumnOrder);
  const value = useMemo(() => [columnOrder, updateColumnOrder], [columnOrder]);
  return <ColumnOrderContext.Provider value={value} {...props} />;
}

export { ColumnOrderContext, ColumnOrderProvider };
