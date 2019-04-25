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
  width: 50%;
  background: white;
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
    const { tasks } = this.props;
    return tasks.map((task, i) => <Task key={task.id} task={task} index={i} />);
  }
}

const Column = props => {
  const { column, tasks } = props;

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
            <InnerList tasks={tasks} />
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
