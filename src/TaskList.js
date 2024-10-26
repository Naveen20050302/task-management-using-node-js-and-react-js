import React, { useState } from 'react';

const TaskList = ({ tasks, onTaskCompleted, onTaskDeleted, onTaskEdited }) => {
    const [isEditing, setIsEditing] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    const startEditing = (task) => {
        setIsEditing(task.id);
        setEditTitle(task.title);
    };

    const saveEdit = (taskId) => {
        onTaskEdited(taskId, editTitle);
        setIsEditing(null);
    };

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                    {isEditing === task.id ? (
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                    ) : (
                        <>
                            <span>{task.title}</span>
                            <span> ({task.priority})</span>
                        </>
                    )}

                    <button onClick={() => onTaskCompleted(task.id)}>
                        {task.isCompleted ? 'Undo' : 'Complete'}
                    </button>

                    {isEditing === task.id ? (
                        <button onClick={() => saveEdit(task.id)}>Save</button>
                    ) : (
                        <button onClick={() => startEditing(task)}>Edit</button>
                    )}

                    <button onClick={() => onTaskDeleted(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
