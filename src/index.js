import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import 'reboot.css';
import { initialData } from './initialData';

import Column from './components/Column';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Pre = styled.pre`
  margin: 0 0 0 30px;
  width: 500px;
  height: 500px;
  border: 1px solid lightgray;
  border-radius: 2px;
  overflow: scroll;
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

    const home = columnState.columns[source.droppableId];
    const foreign = columnState.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...home,
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
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {columnState.columnOrder.map((columnId, index) => {
              const column = columnState.columns[columnId];
              const tasks = column.taskIds.map(
                taskId => columnState.tasks[taskId]
              );
              return (
                <>
                  <Column
                    key={columnId}
                    column={column}
                    tasks={tasks}
                    index={index}
                    columnState={columnState}
                    updateColumnState={updateColumnState}
                  />
                  <Pre>{JSON.stringify(columnState.tasks, null, 2)}</Pre>
                </>
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById(`root`));
