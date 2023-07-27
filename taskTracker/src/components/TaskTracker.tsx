/* import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask, completeTask } from '../storage/taskSlice';

const TaskTracker = () => {
  const [taskName, setTaskName] = useState('');
  const tasks = useSelector(state => state.task.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskName.trim() === '') return;
    dispatch(addTask({ id: Date.now(), name: taskName, completed: false }));
    setTaskName('');
  };

  const handleRemoveTask = id => {
    dispatch(removeTask(id));
  };

  const handleCompleteTask = id => {
    dispatch(completeTask(id));
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      <input
        type="text"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.name}
            </span>
            {!task.completed && <button onClick={() => handleCompleteTask(task.id)}>Complete</button>}
            <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskTracker;
 */