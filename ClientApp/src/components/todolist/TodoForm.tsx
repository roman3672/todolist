import React, { Dispatch, useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { ITodoForm } from '../../interfaces';
import '../../styles/todoform.scss'


const TodoForm = ({title, setTitle, dueDate, setDueDate, addTodo}: ITodoForm) => {
 
  return (
    <div className='todo-form'>
        <div className='form-container'>
            <input className='text form-control' type="text" placeholder='Type in your Todo here' value={title} onChange={(e) => setTitle(e.target.value)} />
            <DateTimePicker className='' value={dueDate} onChange={(value) => setDueDate(value)} disableClock={true} />
            <button className='btn btn-outline-success' onClick={addTodo}>Add Todo</button>
        </div>
    </div>
  )
}

export default TodoForm