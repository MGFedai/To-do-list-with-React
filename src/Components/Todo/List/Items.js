import React from "react";

function Items({ tasks, tasksSet, filter }) {
  const checkItem = (e) => {
    const liDOM = e.target.parentElement.parentElement;
    const checkboxes = [...document.querySelectorAll(".toggle")].map(
      (checkbox) => checkbox.checked
    );
    if (checkboxes.includes(false)) {
      document.querySelector("#toggle-all").checked = false;
    } else {
      document.querySelector("#toggle-all").checked = true;
    }

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(liDOM.id)) {
        tasks[i].view === "completed"
          ? (tasks[i].view = "")
          : (tasks[i].view = "completed");
        break;
      }
    }
    tasksSet([...tasks]);
  };
  const destroyItem = (e) => {
    const liDOM = e.target.parentElement.parentElement;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(liDOM.id)) {
        tasks.splice(i, 1);
        break;
      }
    }
    tasksSet([...tasks]);
  };

  return (
    <ul className="todo-list">
      {tasks.map((todo) => {
        if (todo.view === filter || "all" === filter) {
          return (
            <li key={todo.id} id={todo.id} className={todo.view}>
              <div className={"view"}>
                <input
                  onClick={(e) => checkItem(e)}
                  className="toggle"
                  type="checkbox"
                  checked={todo.view === "completed" ? true : false}
                  onChange={() => {}} // to stop the error messages.
                />
                <label onClick={(e) => console.log(e.target.innerHTML)}>
                  {todo.value}
                </label>
                <button
                  onClick={(e) => destroyItem(e)}
                  className="destroy"
                ></button>
              </div>
            </li>
          );
        }
        return <li key={todo.id}></li>;
      })}
    </ul>
  );
}

export default Items;