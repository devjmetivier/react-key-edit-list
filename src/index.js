import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import 'reboot.css';
import initialData from './initialData';
import Column from './components/Column';

const App = () => {
  const [columnState, updateColumnState] = useState(initialData);

  const onDragStart = () => {
    document.body.style.color = `orange`;
    document.body.style.transition = `background .2s ease`;
  };

  const onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(columnState.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  const onDragEnd = result => {
    document.body.style.color = `inherit`;
    document.body.style.backgroundColor = `inherit`;
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
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      {columnState.columnOrder.map(columnId => {
        const column = columnState.columns[columnId];
        const tasks = column.taskIds.map(taskId => columnState.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById(`root`));
