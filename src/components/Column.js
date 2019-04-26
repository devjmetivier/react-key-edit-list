import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

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

const TaskList = styled.div`
  flex-grow: 1;
  min-height: 100px;
  padding: 8px;
  background: ${props => (props.isDraggingOver ? `lightgray` : `inherit`)};
  transition: background 0.2s ease;
`;

class InnerList extends React.PureComponent {
  render() {
    const { tasks, columnState, updateColumnState } = this.props;
    return tasks.map((task, i) => (
      <Task
        key={task.id}
        task={task}
        index={i}
        columnState={columnState}
        updateColumnState={updateColumnState}
      />
    ));
  }
}

const Column = props => {
  const { column, tasks, columnState, updateColumnState } = props;

  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <InnerList
              tasks={tasks}
              columnState={columnState}
              updateColumnState={updateColumnState}
            />
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
