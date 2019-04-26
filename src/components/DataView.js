import React from 'react';
import styled from 'styled-components';

const Pre = styled.pre`
  margin: 0 0 0 30px;
  width: 500px;
  height: 500px;
  border: 1px solid lightgray;
  border-radius: 2px;
  overflow: scroll;
`;

// eslint-disable-next-line
const DataView = props => <Pre>{JSON.stringify(props.data, null, props.tabs ? '\t' : 2)}</Pre>;

export default DataView;
