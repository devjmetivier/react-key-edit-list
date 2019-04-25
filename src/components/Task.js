import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px;
  padding: 8px;
  width: 40px;
  height: 40px;
  border: 3px solid lightgray;
  border-radius: 50%;
  background: ${props =>
    props.isDragDisabled
      ? `lightgray`
      : props.isDragging
        ? `lightgreen`
        : `white`};

  &:focus {
    outline: none;
    border-color: red;
  }
`;

const Handle = styled.div`
  margin-right: 8px;
  width: 20px;
  height: 20px;
  background: orange;
  border-radius: 4px;
`;

const Task = props => {
  const { task, index } = props;
  const isDragDisabled = task.id === `task-1`;

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          {/* <Handle {...provided.dragHandleProps} /> */}
          {task.content[0]}
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
