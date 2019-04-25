import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  display: flex;
  padding: 8px;
  background: ${props => (props.isDraggingOver ? `skyblue` : `white`)};
  transition: background 0.2s ease;
`;

const Column = props => {
  const { column, tasks, isDropDisabled } = props;

  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable
        droppableId={column.id}
        // type={column.id === `column-3` ? `done` : `active`}
        isDropDisabled={isDropDisabled}
        direction='horizontal'
      >
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, i) => (
              <Task key={task.id} task={task} index={i} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
