"use client";

import { Task, SubTask } from "../types/Task";
import { deleteTask, updateTask } from "../services/api";
import SubTaskList from "./SubTaskList";
import styles from "./TaskList.module.css";

interface Props {
  tasks: Task[];
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (id: number) => void;
}

export default function TaskList({ tasks, onTaskUpdated, onTaskDeleted }: Props) {
  async function handleToggle(task: Task) {
    const updated = await updateTask(task.id!, {
      title: task.title,
      description: task.description,
      completed: !task.completed,
    });
    onTaskUpdated(updated);
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    onTaskDeleted(id);
  }

  function handleSubTasksChanged(task: Task, subTasks: SubTask[]) {
    onTaskUpdated({ ...task, subTasks });
  }

  if (tasks.length === 0) {
    return <p className={styles.emptyMessage}>Nenhuma tarefa ainda. Adicione uma acima!</p>;
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li key={task.id} className={`${styles.item} ${task.completed ? styles.completed : ""}`}>
          <div className={styles.topRow}>
            <div className={styles.info}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task)}
                className={styles.checkbox}
              />
              <div>
                <p className={styles.taskTitle}>{task.title}</p>
                {task.description && (
                  <p className={styles.description}>{task.description}</p>
                )}
              </div>
            </div>
            <button onClick={() => handleDelete(task.id!)} className={styles.deleteButton}>
              Excluir
            </button>
          </div>
          <SubTaskList
            taskId={task.id!}
            subTasks={task.subTasks || []}
            onSubTasksChanged={(subTasks) => handleSubTasksChanged(task, subTasks)}
          />
        </li>
      ))}
    </ul>
  );
}