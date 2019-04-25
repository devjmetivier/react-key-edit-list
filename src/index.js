import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import 'reboot.css';
import initialData from './initialData';
import Column from './components/Column';

const Container = styled.div`
  display: flex;
`;

class InnerList extends React.PureComponent {
  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} />;
  }
}

const App = () => {
  const [columnState, updateColumnState] = useState(initialData);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === `column`) {
      const newColumnOrder = Array.from(columnState.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = { ...columnState, columnOrder: newColumnOrder };
      updateColumnState(newState);
      return;
    }

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
      return;
    }

    // moving from one list to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...columnState,
      columns: {
        ...columnState.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };

    updateColumnState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {columnState.columnOrder.map((columnId, index) => {
              const column = columnState.columns[columnId];

              return (
                <InnerList
                  key={column.id}
                  column={column}
                  taskMap={columnState.tasks}
                  index={index}
                />
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
