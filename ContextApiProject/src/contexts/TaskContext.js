import { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const createTask = async (title, taskDesc) => {
        const response = await axios.post('http://localhost:3004/tasks', {
            title,
            taskDesc,
        });
        console.log(response);
        const createdTasks = [...tasks, response.data];
        setTasks(createdTasks);
    };
    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:3004/tasks');
        debugger;
        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const deleteTaskById = async (id) => {
        await axios.delete(`http://localhost:3004/tasks/${id}`);
        const afterDeletingTasks = tasks.filter((task) => {
            return task.id !== id;
        });
        setTasks(afterDeletingTasks);
    };
    const editTaskById = async (id, updatedTitle, updatedTaskDesc) => {
        await axios.put(`http://localhost:3004/tasks/${id}`, {
            title: updatedTitle,
            taskDesc: updatedTaskDesc,
        });
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
            }
            return task;
        });
        setTasks(updatedTasks);
    };
    return <TaskContext.Provider value={{ tasks, createTask, deleteTaskById, editTaskById }}>
        {children}
    </TaskContext.Provider>;
};

