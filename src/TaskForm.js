import React, { useState } from 'react';

const TaskForm = ({ onTaskAdded }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [priority, setPriority] = useState('Low');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskTitle.trim()) {
            onTaskAdded({
                id: Date.now(),
                title: taskTitle,
                priority: priority,
                isCompleted: false
            });
            setTaskTitle('');
            setPriority('Low');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Add a new task" 
                value={taskTitle} 
                onChange={(e) => setTaskTitle(e.target.value)} 
                required
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
