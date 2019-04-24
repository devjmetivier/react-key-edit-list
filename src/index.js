import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'reboot.css';
import initialData from './initialData';
import Column from './components/Column';

const App = () => {
  const [columnState, updateColumnState] = useState(initialData);

  return columnState.columnOrder.map(columnId => {
    const column = columnState.columns[columnId];
    const tasks = column.taskIds.map(taskId => columnState.tasks[taskId]);

    return <Column key={column.id} column={column} tasks={tasks} />;
  });
};

ReactDOM.render(<App />, document.getElementById('root'));
