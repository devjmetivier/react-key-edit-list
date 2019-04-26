import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import MenuNode from './MenuNode';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 50%;
  background: white;
  height: 500px;
  overflow-y: scroll;
`;

const Title = styled.h3`
  padding: 8px;
  text-align: center;
`;

const MenuListStyle = styled.div`
  flex-grow: 1;
  min-height: 100px;
  padding: 8px;
  background: ${props => (props.isDraggingOver ? `lightgray` : `inherit`)};
  transition: background 0.2s ease;
`;

class InnerList extends React.PureComponent {
  render() {
    const { menus, columnState, updateColumnState } = this.props;
    return menus.map((menu, i) => (
      <MenuNode
        key={menu.id}
        menu={menu}
        index={i}
        columnState={columnState}
        updateColumnState={updateColumnState}
      />
    ));
  }
}

const MenuList = props => {
  const { column, menus, columnState, updateColumnState } = props;

  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <MenuListStyle
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <InnerList
              menus={menus}
              columnState={columnState}
              updateColumnState={updateColumnState}
            />
            {provided.placeholder}
          </MenuListStyle>
        )}
      </Droppable>
    </Container>
  );
};

export default MenuList;
