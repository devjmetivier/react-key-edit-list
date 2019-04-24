import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  background: white;
`;

const Task = props => {
  const { task, index } = props;

  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
