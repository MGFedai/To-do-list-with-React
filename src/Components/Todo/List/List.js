/* eslint-disable array-callback-return */
import { useState } from "react";
import Items from "./Items";

function List({ tasks, tasksSet, filter, filterSet }) {
  const inputStart = tasks.length !== 0 ? tasks[tasks.length - 1].id + 1 : 0;
  const defaultInput = { value: "", view: "", id: inputStart };
  const [input, inputSet] = useState(defaultInput);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.value.trim()) {
      return false;
    }
    tasksSet([
      ...tasks,
      { value: input.value.trim(), view: input.view, id: input.id },
    ]);
    inputSet({ value: "", view: "", id: input.id + 1 });
  };

  const toggleAll = (e) => {
    const toggle = document.getElementById("toggle-all");
    const checkboxes = [...document.querySelectorAll(".toggle")];
    checkboxes.map((checkbox) => (checkbox.checked = false));
    let view = "";
    if (!toggle.checked) {
      view = "completed";
      checkboxes.map((checkbox) => (checkbox.checked = true));
    }
    for (let i = 0; i < tasks.length; i++) {
      const item = tasks[i];
      item.view = view;
    }

    tasksSet([...tasks]);
  };

  const isHidden = () => {
    if (tasks.length === 0) {
      const toggle = document.querySelector("toggle-all");
      if (toggle !== null && toggle !== undefined) toggle.checked = false;
      return true;
    }
    return false;
  };

  const changeFilter = (e, filter) => {
    filterSet(filter);
    document.querySelector(".selected").classList.remove("selected");
    e.target.classList.add("selected");
  };

  const destroyCompleted = () => {
    tasksSet([
      ...tasks.filter((todo) => {
        if (todo.view !== "completed") {
          return todo;
        }
      }),
    ]);
  };
  return (
    <section className="todoapp">
      <header>
        <form onSubmit={handleSubmit}>
          <h1>To-Do's</h1>
          <input
            className="new-todo"
            name="taskInput"
            value={input.value}
            onChange={(e) => inputSet({ ...input, value: e.target.value })}
            placeholder="Bugün seninle neler yapsak..."
            autoFocus
          />
        </form>
      </header>

      <section className="main">
        <input
          className="toggle-all"
          id="toggle-all"
          type="checkbox"
          value={false}
          hidden={isHidden()}
        />
        <label
          onClick={(e) => toggleAll(e)}
          hidden={isHidden()}
          htmlFor="toggle-all"
        >
          Mark all as complete
        </label>
        <Items tasks={tasks} tasksSet={tasksSet} filter={filter} />

        <footer className="footer" hidden={isHidden()}>
          <span className="todo-count">
            <strong>
              {tasks.filter((item) => item.view !== "completed").length + " "}
            </strong>
            {tasks.length === 1 ? "item" : "Kayıt"} kaldı
          </span>

          <ul className="filters">
            <li onClick={(e) => changeFilter(e, "all")}>
              <a href="#/" className="selected">
                Tümü
              </a>
            </li>
            <li onClick={(e) => changeFilter(e, "")}>
              <a href="#/">Yapılacaklar</a>
            </li>
            <li onClick={(e) => changeFilter(e, "completed")}>
              <a href="#/">Yapılanlar</a>
            </li>
          </ul>

          <button
            className="clear-completed"
            onClick={() => {
              destroyCompleted();
            }}
          >
            Yapılanları Temizle
          </button>
        </footer>
      </section>
    </section>
  );
}

export default List;