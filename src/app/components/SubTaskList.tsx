"use client";

import { useState } from "react";
import { SubTask } from "../types/Task";
import { createSubTask, updateSubTask, deleteSubTask } from "../services/api";
import styles from "./SubTaskList.module.css";

interface Props {
  taskId: number;
  subTasks: SubTask[];
  onSubTasksChanged: (subTasks: SubTask[]) => void;
}

export default function SubTaskList({ taskId, subTasks, onSubTasksChanged }: Props) {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  async function handleAdd() {
    if (!newTitle.trim()) return;
    const created = await createSubTask(taskId, { title: newTitle, completed: false });
    onSubTasksChanged([...subTasks, created]);
    setNewTitle("");
  }

  async function handleToggle(subTask: SubTask) {
    const updated = await updateSubTask(taskId, subTask.id!, {
      title: subTask.title,
      completed: !subTask.completed,
    });
    onSubTasksChanged(subTasks.map((s) => (s.id === updated.id ? updated : s)));
  }

  async function handleDelete(id: number) {
    await deleteSubTask(taskId, id);
    onSubTasksChanged(subTasks.filter((s) => s.id !== id));
  }

  return (
    <div className={styles.container}>
      <button className={styles.toggle} onClick={() => setOpen(!open)}>
        {open ? "▲" : "▼"} Sub-tarefas ({subTasks.length})
      </button>

      {open && (
        <>
          <ul className={styles.list}>
            {subTasks.map((sub) => (
              <li key={sub.id} className={styles.item}>
                <div className={styles.itemLeft}>
                  <input
                    type="checkbox"
                    checked={sub.completed}
                    onChange={() => handleToggle(sub)}
                    className={styles.checkbox}
                  />
                  <span className={`${styles.title} ${sub.completed ? styles.titleCompleted : ""}`}>
                    {sub.title}
                  </span>
                </div>
                <button onClick={() => handleDelete(sub.id!)} className={styles.deleteBtn}>
                  Excluir
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.form}>
            <input
              type="text"
              placeholder="Nova sub-tarefa..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className={styles.input}
            />
            <button onClick={handleAdd} className={styles.addBtn}>
              Adicionar
            </button>
          </div>
        </>
      )}
    </div>
  );
}