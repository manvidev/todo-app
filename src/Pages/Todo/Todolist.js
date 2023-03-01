import React, { useState } from "react";

export const Todolist = (props) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleToggleCompleted = (index) => {
    const newTodos = [...props?.todos];
    newTodos[index].completed = !newTodos[index].completed;
    props?.setTodos(newTodos);
  };

  const handleEditTodo = (index, newTitle) => {
    const newTodos = [...props?.todos];
    console.log(newTodos, "newTodos");
    newTodos[index].title = newTitle;
    props?.setTodos(newTodos);
    setIsEdit(false);
  };

  return (
    <div>
      <li
        key={props?.index}
        className={props?.todo.completed ? "completed" : ""}
      >
        <input
          type="checkbox"
          checked={props?.todo.completed}
          onChange={() => handleToggleCompleted(props?.index)}
        />
        {props?.todo.completed ? (
          props?.todo.title
        ) : (
          <span
            contentEditable={isEdit}
            onDoubleClick={(e) => setIsEdit(true)}
            onBlur={(e) => handleEditTodo(props?.index, e.target.textContent)}
          >
            {props?.todo.title}
          </span>
        )}

        <span>
          {props?.todo.completed ? "Completed Todo" : "UnCompleted Todo"}
        </span>
      </li>
    </div>
  );
};
