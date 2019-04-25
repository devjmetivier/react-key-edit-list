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

  const onDragStart = start => {
    const homeIndex = columnState.columnOrder.indexOf(start.source.droppableId);
    updateColumnState({ ...columnState, homeIndex });
  };

  const onDragEnd = result => {
    updateColumnState({ ...columnState, homeIndex: null });

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
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Container>
        {columnState.columnOrder.map((columnId, index) => {
          const column = columnState.columns[columnId];
          const tasks = column.taskIds.map(taskId => columnState.tasks[taskId]);

          const isDropDisabled = index < columnState.homeIndex;

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              isDropDisabled={isDropDisabled}
            />
          );
        })}
      </Container>
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById(`root`));
