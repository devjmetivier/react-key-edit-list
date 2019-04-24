import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
`;

const Task = props => {
  const { task } = props;

  return <Container>{task.content}</Container>;
};

export default Task;
