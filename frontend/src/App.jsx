/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import TaskList from "./components/smart/TaskList"
import TaskForm from "./components/smart/TaskForm"
import './App.css'
import Button from "./components/dumb/Button"

export default function App() {
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState({})

  const fetchTasks = async () => {
    const response = await fetch('http://127.0.0.1:5000/tasks')
    const data = await response.json()
    setTasks(data.tasks)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentTask({})
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    if (isModalOpen) return
    setCurrentTask(task)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchTasks()
  }

  return (
    <>
      <div
        className="my-4 bg-white py-8 px-16 max-md:p-4 shadow-md mx-container"
      >
        <TaskList tasks={tasks} updateTask={openEditModal} updateCallback={onUpdate} />

        <Button
          onClick={openCreateModal}
        >
          Create Task
        </Button>

        {
          isModalOpen &&
          <div
            className="fixed z-10 left-0 top-0 
            bg-black bg-opacity-40 w-full h-full overflow-auto"
          >
            <div
              className="modal-content bg-slate-50 py-8 px-16 rounded-md
              border border-slate-500 border-b-2 w-1/2 max-lg:w-2/3 max-md:w-4/5 max-sm:w-11/12"
              style={{ margin: '10% auto' }}
            >
              <div className="w-full flex justify-between">
                <span className="text-xl mb-4">Task form</span>
                <button
                  className="h-6 w-6 text-2xl place-content-center cursor-pointer
                    close inline-block border-2
                    border-gray-400 text-gray-500
                    hover:border-red-400 hover:text-red-500 rounded
                    active:bg-red-500 active:text-gray-50"
                  onClick={closeModal}
                >
                  <span className="relative -top-2">
                    &times;
                  </span>
                </button>
              </div>

              <TaskForm existingTask={currentTask} updateCallback={onUpdate} />
            </div>
          </div>
        }
      </div>
    </>
  )
}
