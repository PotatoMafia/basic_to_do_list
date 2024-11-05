import React, { useState, useRef, useEffect } from 'react';
import '../TodoItem.css';

export default function TodoItem({ onDelete, onComplete, item }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTodo, setEditedTodo] = useState(item.todo);
    const [editedDescription, setEditedDescription] = useState(item.description);
    const [editedDueDate, setEditedDueDate] = useState(item.dueDate);
    const [editedDifficulty, setEditedDifficulty] = useState(item.difficulty);

    const itemRef = useRef(null); // Создаем ref для элемента задачи

    useEffect(() => {
        if (isEditing && itemRef.current) {
            itemRef.current.scrollIntoView({behavior: 'smooth', block: 'start'}); // Прокручиваем к элементу
        }
    }, [isEditing]);

    const isOverdue = () => {
        if (!item.dueDate) return false;
        const currentDate = new Date();
        const dueDate = new Date(item.dueDate);
        return dueDate < currentDate;
    };

    const isWaiting = () => {
        if (!item.dueDate) return true;
        const currentDate = new Date();
        const dueDate = new Date(item.dueDate);
        const timeDiff = dueDate - currentDate;
        const daysUntilDue = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysUntilDue > 3;
    };

    const canDelete = () => {
        return isOverdue() || item.completed;
    };

    const getEmoji = () => {
        if (item.completed) {
            return <span className="emoji happy">😊</span>;
        } else if (isOverdue()) {
            return <span className="emoji sad">😢</span>;
        } else if (isWaiting()) {
            return <span className="emoji waiting">⏳</span>;
        } else {
            return <span className="emoji thinking">🤔</span>;
        }
    };

    const handleCheckboxChange = () => {
        if (!isWaiting()) {
            const updatedItem = {
                ...item,
                completed: !item.completed,
            };
            onComplete(updatedItem);
        }
    };

    const handleCancel = () => {
        setEditedTodo(item.todo);
        setEditedDescription(item.description);
        setEditedDueDate(item.dueDate);
        setEditedDifficulty(item.difficulty);
        setIsEditing(false);
    };

    const handleSave = () => {
        console.log('Saving updated item:', editedDifficulty);
        const updatedItem = {
            ...item,
            todo: editedTodo,
            description: editedDescription,
            dueDate: editedDueDate,
            difficulty: editedDifficulty,
        };
        onComplete(updatedItem);
        setIsEditing(false);
    };

    const getTruncatedDescription = () => {
        return item.description.length > 30 ? item.description.slice(0, 30) + '...' : item.description;
    };

    return (
        <div
            ref={itemRef}
            className={`todo-item ${item.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''} ${isWaiting() ? 'waiting' : ''} ${isEditing ? 'editing' : ''}`}>

            {!isEditing && (
                <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={handleCheckboxChange}
                    disabled={isWaiting() && !item.completed}
                />
            )}

            {isEditing ? null : getEmoji()}
            {isEditing ? null : <span>{item.todo}</span>}

            {isEditing ? (
                <div className="edit-fields">
                    <input
                        type='text'
                        value={editedTodo}
                        onChange={(e) => setEditedTodo(e.target.value)}
                        placeholder="Task name"
                        style={{marginBottom: '10px'}}
                        maxLength={25}
                    />
                    <textarea
                        className="edit-description"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        placeholder="Task description"
                        style={{marginBottom: '10px'}}
                    />
                    <input
                        type="datetime-local"
                        value={editedDueDate}
                        onChange={(e) => setEditedDueDate(e.target.value)}
                        style={{marginBottom: '10px'}}
                    />
                    <div className="star-rating">
                        {[...Array(10)].map((_, index) => (
                            <span
                                key={index}
                                className={`star ${editedDifficulty > index ? 'filled' : ''}`}
                                onClick={() => setEditedDifficulty(index + 1)}
                            >
                            ★
                        </span>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <p className="todo-description" title={item.description}>{getTruncatedDescription()}</p>
                    <p className="todo-difficulty">{'⭐'.repeat(item.difficulty)}</p>
                    <p className="todo-due-date">{item.dueDate ? new Date(item.dueDate).toLocaleString() : 'No date set'}</p>
                </>
            )}

            <div className="button-container">
                {isEditing ? (
                    <>
                        <button className="buttonSave" onClick={handleSave}>Save</button>
                        <button className="buttonCancel" onClick={handleCancel}>Cancel</button>
                    </>
                ) : (
                    <>
                        {canDelete() && (
                            <button className="buttonDelete" onClick={() => onDelete(item)}>Delete</button>
                        )}
                        {item.completed === false && (
                            <button className="buttonEdit" onClick={() => setIsEditing(true)}>Edit</button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}