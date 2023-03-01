import React, { useState } from "react";

export const Todolist = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updatedTodo, setupdatedTodo] = useState("");

  // for completing the todo's
  const handleToggleCompleted = (index) => {
    const newTodos = [...props?.todos];
    newTodos[index].completed = !newTodos[index].completed;
    props?.setTodos(newTodos);
  };

  // for editing the todo's
  const handleEditTodo = (index, newTitle) => {
    const newTodos = [...props?.todos];
    newTodos[index].title = newTitle;
    props?.setTodos(newTodos);
    setIsEdit(false);
  };

  const handleChange = (e) => {
    setupdatedTodo(e.target.value);
  };
  const onSaveEditTodos = (e) => {
    let updateValue = props?.todos?.map((item) => {
      return e.target.id == item.id
        ? { ...item, title: updatedTodo }
        : { ...item };
    });

    props?.setTodos(updateValue);
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
        ) : isEdit ? (
          <div className="add-todo-container">
            <input
              contentEditable={isEdit}
              defaultValue={props?.todo.title}
              onChange={(e) => handleChange(e)}
            />{" "}
            <span>
              <button id={props?.todo?.id} onClick={(e) => onSaveEditTodos(e)}>
                Save Edited Todo
              </button>
            </span>
          </div>
        ) : (
          <span
            // contentEditable={isEdit}
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
