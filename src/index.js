import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import 'reboot.css';
import { initialData } from './initialData';

import MenuList from './components/MenuList';
import DataView from './components/DataView';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
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
      const newMenuIds = Array.from(home.menuIds);
      newMenuIds.splice(source.index, 1);
      newMenuIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...home,
        menuIds: newMenuIds,
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
              const menus = column.menuIds.map(
                menuId => columnState.menus[menuId]
              );
              return (
                <>
                  <MenuList
                    key={columnId}
                    column={column}
                    menus={menus}
                    index={index}
                    columnState={columnState}
                    updateColumnState={updateColumnState}
                  />
                  <DataView data={columnState.menus} />
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
