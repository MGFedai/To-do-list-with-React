import { useState } from "react";
import "./styles.css";
import List from "./List/List";

function ToDo() {
  const [tasks, tasksSet] = useState([
    { value: "Sinemaya gidilecek", view: "completed", id: 0 },
    { value: "Patikada Çalışılacak", view: "", id: 1 },
    { value: "İsmail abi mutlu edilecek", view: "", id: 2 },
  ]);
  const [filter, filterSet] = useState("all");
  return (
    <div>
      <List
        tasks={tasks}
        tasksSet={tasksSet}
        filter={filter}
        filterSet={filterSet}
      />
    </div>
  );
}

export default ToDo;