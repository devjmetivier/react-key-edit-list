import React, { useState } from 'react';

const containerStyles = {
  position: `fixed`,
  top: `0`,
  right: `0`,
  height: `100vh`,
};

const buttonStyles = {
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  position: `absolute`,
  right: `calc(100% + 15px)`,
  top: `15px`,
  width: `40px`,
  height: `40px`,
};

const preStyles = {
  margin: `0`,
  padding: `8px`,
  width: `100%`,
  maxWidth: `100%`,
  height: `100%`,
  border: `1px solid lightgray`,
  borderRadius: `2px`,
  background: `white`,
};

// eslint-disable-next-line
const DataView = props =>{
  const { data, tabs } = props;
  const [on, setOn] = useState(false);

  return (
    <div style={{ ...containerStyles, width: on ? `400px` : `0` }}>
      <button
        type='button'
        style={buttonStyles}
        onClick={() => setOn(prev => !prev)}
      >
        i
      </button>
      {on && (
        <pre style={{ ...preStyles, display: on ? `block` : `none` }}>
          {JSON.stringify(data, null, tabs ? `\t` : 2)}
        </pre>
      )}
    </div>
  );
};

export default DataView;
