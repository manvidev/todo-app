import React, { useState, useEffect } from "react";
import { Todolist } from "./Todolist";
import "./Todo.css";

export const Todo = () => {
  const LOCAL_STORAGE_KEY = "todos";
  const [todos, setTodos] = useState(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storedTodos) return storedTodos;
    } else {
      return [];
    }
  });
  const [newTodo, setNewTodo] = useState("");

  // for adding the todo's
  const handleAddTodo = () => {
    const todo = { id: todos.length, title: newTodo, completed: false };
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const handleClearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storedTodos) setTodos(storedTodos);
    }
  }, []);

  return (
    <div className="container">
      <div className="todo-list-container">
        <h1>Todo List</h1>
        <div className="add-todo-container">
          <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <Todolist
              todos={todos}
              setTodos={setTodos}
              index={index}
              todo={todo}
              setNewTodo={setNewTodo}
              newTodo={newTodo}
            />
          ))}
        </ul>
        <button className="clear-completed" onClick={handleClearCompleted}>
          Clear Completed Todo's
        </button>
      </div>
    </div>
  );
};
