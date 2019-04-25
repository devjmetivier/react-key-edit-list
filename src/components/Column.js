import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 220px;
  background: white;
`;

const Title = styled.h3`
  padding: 8px;
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
  const { column, tasks, index } = props;

  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable
            droppableId={column.id}
            // type={column.id === `column-3` ? `done` : `active`}
            type='task'
            // direction='horizontal'
          >
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
      )}
    </Draggable>
  );
};

export default Column;
