import React from 'react';
import { TasksProvider } from './data/tasks';
import { ColumnsProvider } from './data/columns';
import { ColumnOrderProvider } from './data/columnOrder';

function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );
}

function ContextProvider({ children }) {
  return (
    <ProviderComposer
      contexts={[
        <TasksProvider />,
        <ColumnsProvider />,
        <ColumnOrderProvider />,
      ]}
    >
      {children}
    </ProviderComposer>
  );
}

const initialData = {
  tasks: {
    'task-1': { id: `task-1`, content: `take out the garbage` },
    'task-2': { id: `task-2`, content: `watch a show` },
    'task-3': { id: `task-3`, content: `charge phone` },
    'task-4': { id: `task-4`, content: `cook dinner` },
  },
  columns: {
    'column-1': {
      id: `column-1`,
      title: `Items`,
      taskIds: [`task-1`, `task-2`, `task-3`, `task-4`],
    },
  },
  // facilitate reordering of the column
  columnOrder: [`column-1`],
};

export { ContextProvider, initialData };
