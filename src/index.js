import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import 'reboot.css';
import initialData from './initialData';
import Column from './components/Column';

const Container = styled.div`
  display: flex;
`;

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

    const start = columnState.columns[source.droppableId];
    const finish = columnState.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
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
      return;
    }

    // moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...columnState,
      columns: {
        ...columnState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    updateColumnState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {columnState.columnOrder.map(columnId => {
          const column = columnState.columns[columnId];
          const tasks = column.taskIds.map(taskId => columnState.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById(`root`));
