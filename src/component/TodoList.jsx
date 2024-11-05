import React, { useState } from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onAddTodo, onDeleteTodo, onCompleteTodo }) {
    const [todo, setTodo] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState(1);
    const [dueDate, setDueDate] = useState('');

    const addTodo = () => {
        if (todo.trim() === '' || description.trim() === '' || dueDate === '') {
            alert("Please fill in all fields, including the due date.");
            return;
        }
        onAddTodo(todo, description, difficulty, dueDate);
        setTodo('');
        setDescription('');
        setDifficulty(1);
        setDueDate('');
    };

    return (
        <div>
            <h1>Todo App</h1>
            <div className="input-container">
                <input
                    type='text'
                    className="todo-input"
                    value={todo}
                    onChange={e => setTodo(e.target.value)}
                    placeholder="Task name"
                    maxLength={25}
                />
                <textarea
                    className="todo-description-input"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Task description"
                />
                <input
                    type="datetime-local"
                    className="todo-due-date-input"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                />
                <div className="star-rating">
                    {[...Array(10)].map((_, index) => (
                        <span
                            key={index}
                            className={`star ${difficulty > index ? 'filled' : ''}`}
                            onClick={() => setDifficulty(index + 1)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <button onClick={addTodo}>Add</button>
            </div>
            <div className="todo-container">
                {todos
                    .slice()
                    .sort((a, b) => b.difficulty - a.difficulty)
                    .map(item => (
                        <TodoItem
                            key={item.id}
                            onDelete={onDeleteTodo}
                            onComplete={onCompleteTodo}
                            item={item}
                        />
                    ))}
            </div>
        </div>
    );
}
