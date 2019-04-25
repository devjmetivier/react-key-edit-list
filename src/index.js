import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import 'reboot.css';
import initialData from './initialData';
import Column from './components/Column';

const App = () => {
  const [columnState, updateColumnState] = useState(initialData);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const column = columnState.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...columnState,
      columns: {
        ...columnState.columns,
        [newColumn.id]: newColumn,
      },
    };

    updateColumnState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columnState.columnOrder.map(columnId => {
        const column = columnState.columns[columnId];
        const tasks = column.taskIds.map(taskId => columnState.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById(`root`));
