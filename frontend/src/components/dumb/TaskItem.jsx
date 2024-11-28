/* eslint-disable react/prop-types */
import Button from './Button'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function to_date(due_date) {
  const date_obj = new Date(due_date)
  return date_obj
}

export default function TaskItem({ task, onUpdate, onDelete }) {
  const date = to_date(task.due_date)
  const date_string = date.toLocaleString('pt-BR', { month: 'short', day: 'numeric', year: 'numeric' })
  const today = new Date(Date.now())
  const todayPlusSeven = new Date()
  
  todayPlusSeven.setDate(today.getDate() + 7)

  let status_bgColor = 'white'
  let date_color = '#555'

  if(date.getTime() <= todayPlusSeven.getTime()) {
    status_bgColor ='#d90'
    date_color = '#d90'
  }

  if (date.getTime() <= today.getTime()) {
    status_bgColor ='#e00'
    date_color = '#e00'
  }

  return (
    <>
      <div
        className="border-b mt-4 rounded-sm pb-4"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: "1rem",
          justifyContent: "center"
        }}
      >
        <div className="flex items-center">
          <div
            className="inline-block w-5 h-5 rounded text-center text-white font-bold"
            style={{ backgroundColor: status_bgColor }}
          >
            <span className='relative -top-0.5'>!</span>
          </div>
        </div>

        <div>
          <p className="block text-lg">{task.description}</p>

          <div className='flex gap-2 flex-wrap items-end'>
            <span className='px-2 py-0.5 text-sm bg-slate-200
           rounded-lg inline-block mt-1 font-bold text-slate-500'>
              {/* make this a dumb component:
                TaskTag with a smart component to filter tags
            */}
              {task.category}
            </span>

            <span
              style={{color: date_color}}
            >
              {date_string}
            </span>
          </div>
        </div>

        <div className="flex flex-row gap-1">
          <Button onClick={onUpdate}>
            <MdEdit />
          </Button>

          <Button onClick={onDelete}>
            <MdDelete />
          </Button>
        </div>
      </div>
    </>
  )
}