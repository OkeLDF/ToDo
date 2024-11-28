/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import TaskItem from '../dumb/TaskItem'

export default function TaskList({ tasks, updateTask, updateCallback }) {
  const deleteTask = async (id) => {
    try {
      const options = {
        method: 'DELETE'
      }
      const response = await fetch(`http://127.0.0.1:5000/delete_task/${id}`, options)
      if (response.status === 200) {
        updateCallback()
      }
      else {
        console.error('Failed to delete task')
      }
    }
    catch (e) {
      alert(e)
    }
  }

  return (
    <>
      <div className="py-4">
        <h1 className="text-center text-2xl font-bold">Tasks</h1>
      </div>

      <ul className="mb-8">
        {tasks.map((task, index) => (
          <li key={index}>
            <TaskItem
              task={task}
              onUpdate={ () => updateTask(task) }
              onDelete={ () => deleteTask(task.id) }
            />
          </li>
        ))}
      </ul>
    </>
  )
}