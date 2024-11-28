/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Button from "../dumb/Button";

function TaskFormInput({ label, value, setValue, type, name }) {
  return (
    <label
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr'
      }}
    >
      <span
        className="mr-6 w-20 inline-block"
      >{label}</span>
      <input
        className="border-slate-400 border rounded px-2 py-1"
        type={type}
        name={name}
        value={value}
        onChange={(e) => {
          e.preventDefault();
          setValue(e.target.value);
        }}
      />
    </label>
  )
}

function get_date(s){
  if (!s) return ''
  return s.split('T')[0]
}

export default function TaskForm({ existingTask = {}, updateCallback }) {
  const [description, setDescription] = useState(existingTask.description || '')
  const [category, setCategory] = useState(existingTask.category || '')
  const [dueDate, setDueDate] = useState(get_date(existingTask.due_date) || '')
  
  const updating = Object.entries(existingTask).length !== 0

  const handleSubmit = async (e) => {
    e.preventDefault()

    const d = new Date(dueDate)

    const data = {
      description,
      category,
      dueDate: d.toISOString()
    }

    const url = "http://127.0.0.1:5000/" + (
      updating ?
        `update_task/${existingTask.id}`
        : 'add_task'
    )

    const options = {
      method: (updating ? 'PUT' : 'POST'),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const response = await fetch(url, options)
    if (!response.ok) {
      const data = await response.json()
      alert(data.message)
    }
    else {
      updateCallback()
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mt-2 p-1"
      >

        <TaskFormInput
          label="Description"
          type="text"
          name="description"
          value={description}
          setValue={setDescription}
        />

        <TaskFormInput
          label="Category"
          type="text"
          name="category"
          value={category}
          setValue={setCategory}
        />

        <TaskFormInput
          label="Due Date"
          type="date"
          name="dueDate"
          value={dueDate}
          setValue={setDueDate}
        />

        <div className="mt-3"><Button type='submit'>Submit</Button></div>
      </form>
    </>
  )
}