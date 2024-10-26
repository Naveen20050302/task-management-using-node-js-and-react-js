import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

function App() {
    // Initialize tasks from localStorage
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    // Filter options
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Persist tasks in localStorage when they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Add new task to the list
    const handleTaskAdded = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    // Update task completion status
    const handleTaskCompleted = (taskId) => {
        setTasks((prevTasks) => 
            prevTasks.map((task) => 
                task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    };

    // Edit task
    const handleTaskEdited = (taskId, updatedTitle) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, title: updatedTitle } : task
            )
        );
    };

    // Delete a task from the list
    const handleTaskDeleted = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
    };

    // Filter tasks based on completion status and search query
    const filteredTasks = tasks
        .filter((task) => {
            if (filter === 'completed') return task.isCompleted;
            if (filter === 'incomplete') return !task.isCompleted;
            return true; // 'all' filter
        })
        .filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="todo-container">
            <h1>Task Manager</h1>
            <TaskForm onTaskAdded={handleTaskAdded} />
            
            {/* Search and Filter Options */}
            <div className="task-controls">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Tasks</option>
                    <option value="completed">Completed Tasks</option>
                    <option value="incomplete">Incomplete Tasks</option>
                </select>
            </div>

            <TaskList 
                tasks={filteredTasks} 
                onTaskCompleted={handleTaskCompleted} 
                onTaskDeleted={handleTaskDeleted} 
                onTaskEdited={handleTaskEdited}
            />
        </div>
    );
}

export default App;
