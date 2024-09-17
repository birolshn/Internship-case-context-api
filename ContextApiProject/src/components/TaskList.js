import { useContext } from 'react';
import TaskShow from './TaskShow';
import { TaskContext } from '../contexts/TaskContext';


function TaskList() {
  const { tasks } = useContext(TaskContext);
  return (
    <div className="task-list">
      {tasks.map((task) => {
        return (
          <TaskShow
            key={task.id}
            task={task}

          />
        );
      })}
    </div>
  );
}

export default TaskList;
