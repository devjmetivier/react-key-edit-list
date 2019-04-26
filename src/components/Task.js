import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  background: ${props => (props.isDragging ? `lightgreen` : `white`)};
  overflow: hidden;
`;

const TaskHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskBody = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  height: ${props => (props.disabled ? `0` : `auto`)};
  visibility: ${props => (props.disabled ? `hidden` : `visbile`)};
`;

const Handle = styled.div`
  margin-right: 8px;
  width: 20px;
  height: 20px;
  background: orange;
  border-radius: 2px;
`;

const Task = props => {
  const { task, index, columnState, updateColumnState } = props;
  const [disabled, setDisabled] = useState(true);

  const entries = Object.entries(task);

  const textChange = ({ target }, property, type) => {
    let { value } = target;

    if (type === `object`) {
      value = value.split(`,`);
      value = value.map(val => val.trim());
    }

    const newText = {
      ...columnState,
      tasks: {
        ...columnState.tasks,
        [task.id]: {
          ...task,
          [property]: value,
          id: task.id,
        },
      },
    };
    updateColumnState(newText);
  };

  const keyCheck = e => {
    const { key, keyCode } = e;
    const lowKey = key.toLowerCase();

    switch (lowKey) {
    case `space`:
      setDisabled(true);
      break;
    case `enter`:
      setDisabled(prev => !prev);
      break;
    case `escape`:
      setDisabled(true);
      break;
    default:
      // do nothing
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          onKeyPress={keyCheck}
        >
          <TaskHead onClick={() => setDisabled(prev => !prev)}>
            <div style={{ marginRight: `8px` }}>{index + 1}.</div>
            <h2>{task.name.toUpperCase()}</h2>
            <span />
            {/* <Handle style={{ opacity: 0 }} {...provided.dragHandleProps} /> */}
          </TaskHead>

          <TaskBody disabled={disabled}>
            {entries.map((property, i) => {
              if (i === 0) return;
              return (
                <div style={{ marginBottom: `8px` }}>
                  <span>
                    {property[0].charAt(0).toUpperCase() + property[0].slice(1)}
                    :{` `}
                  </span>
                  <input
                    key={`input-${index}-${i}`}
                    style={{ padding: `0 4px` }}
                    type='text'
                    value={property[1]}
                    onChange={e =>
                      textChange(e, property[0], typeof property[1])
                    }
                    disabled={disabled}
                  />
                </div>
              );
            })}
          </TaskBody>

          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
