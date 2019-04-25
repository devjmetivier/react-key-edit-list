import React, { useState, useMemo, createContext } from 'react';

const initTasks = {
  'task-1': { id: `task-1`, content: `take out the garbage` },
  'task-2': { id: `task-2`, content: `watch a show` },
  'task-3': { id: `task-3`, content: `charge phone` },
  'task-4': { id: `task-4`, content: `cook dinner` },
};

const TasksContext = createContext();

function TasksProvider(props) {
  const [tasks, updateTasks] = useState(initTasks);
  const value = useMemo(() => [tasks, updateTasks], [tasks]);
  return <TasksContext.Provider value={value} {...props} />;
}

export { TasksContext, TasksProvider };
