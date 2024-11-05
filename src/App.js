// Dodawanie zadań: Użytkownicy mogą dodawać nowe zadania z nazwą, opisem, poziomem trudności oraz terminem realizacji.
// Funkcja addTodo obsługuje dodawanie zadań, sprawdzając, czy podano nazwę i opis,
// a następnie aktualizując stan aplikacji o nowo utworzone zadanie.


// Edycja zadań: Użytkownicy mogą edytować istniejące zadania, zmieniając wszystkie ich atrybuty.
// Komponent TodoItem umożliwia edytowanie nazwy, opisu, daty wykonania i poziomu trudności zadania,
// a następnie aktualizuje zadanie po zapisaniu zmian.


// Usuwanie zadań: Możliwość usunięcia zadań, które są przeterminowane lub zakończone.
// Użytkownicy mogą usunąć zadanie, klikając przycisk "Usuń".
// Funkcja deleteTodo filtruje listę zadań, aby usunąć zadanie o podanym id.


// Oznaczanie zadań jako ukończone: Użytkownicy mogą oznaczać zadania jako ukończone, co jest wizualnie reprezentowane.
// Klikając na pole wyboru, użytkownicy mogą oznaczać zadanie jako ukończone lub nieukończone.
// Stan ukończenia jest również odzwierciedlany w UI za pomocą odpowiednich klas CSS.


// Sortowanie zadań: Lista zadań jest sortowana według poziomu trudności, aby trudniejsze zadania były na górze.
// Przy dodawaniu lub aktualizowaniu zadań, lista jest sortowana malejąco według poziomu trudności.


// Statusy zadań:
// Nowe: Zadanie jest świeżo dodane i jeszcze nie zostało oznaczone jako ukończone. Użytkownik może je edytować.
// Ukończone: Zadanie zostało pomyślnie zrealizowane. Użytkownik może je przeglądać, ale nie można go już edytować ani usunąć, jeśli nie jest przeterminowane.
//
// Przeterminowane: Zadanie, którego termin realizacji minął, ale nie zostało ukończone. Użytkownik może je usunąć lub oznaczyć jako ukończone, jeśli zostało zrealizowane mimo upływu terminu.
//
// Oczekujące: Zadanie, które ma termin realizacji w przyszłości. Użytkownik może je edytować lub usunąć przed upływem terminu.
// Oczekujące jeśli >=3 dni do deadline'u.



import React, { useState, useEffect } from 'react';
import TodoList from './component/TodoList';
import todosData from './data/todos.json';
import './App.css';

let nextId = todosData.length + 1;

export default function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        setTodos(todosData);
    }, []);

    const addTodo = (todo, description, difficulty, dueDate) => {
        const newTodo = {
            id: nextId++, // Nowy id
            todo,
            description,
            difficulty,
            dueDate,
            completed: false,
        };
        const updatedTodos = [...todos, newTodo];

        updatedTodos.sort((a, b) => b.difficulty - a.difficulty);
        setTodos(updatedTodos);
    };

    const completeTodo = (updatedItem) => {
        const updatedTodos = todos.map(todo =>
            todo.id === updatedItem.id ? updatedItem : todo
        );

        updatedTodos.sort((a, b) => b.difficulty - a.difficulty);
        setTodos(updatedTodos);
    };

    const deleteTodo = (item) => {
        setTodos(todos.filter(todo => todo.id !== item.id));
    };

    return (
        <div>
            <TodoList
                todos={todos}
                onAddTodo={addTodo}
                onDeleteTodo={deleteTodo}
                onCompleteTodo={completeTodo}
            />

        </div>

    );
}
