import React, {useRef, useState} from 'react'
import '../../styles/todoitem.scss'
import {ITodoItem} from "../../interfaces";

const TodoItem = ({id, title, isDone, dueDate, removeTodo, markTodo, editTodo}: ITodoItem) => {
    
    const [itemTitle, setItemTitle] = useState<string>(title)
    
    const [editMode, setEditMode] = useState(false)
    
    const titleElement = useRef<HTMLInputElement>(null)
    const todoElement = useRef<HTMLDivElement>(null)
    
    const handleEdit = () => {
        
        if(!editMode){
            titleElement.current?.removeAttribute('readOnly')
            titleElement.current?.classList.add('title_edit')
            todoElement.current?.classList.add('todo-item_edit')
            titleElement.current?.focus()
            setEditMode(true)
            
        } else{
            titleElement.current?.setAttribute('readOnly', 'true')
            titleElement.current?.classList.remove('title_edit')
            todoElement.current?.classList.remove('todo-item_edit')
            setItemTitle(title)
            setEditMode(false)
        }
    }
    
    const applyChanges = async () => {
        handleEdit()
        setItemTitle(itemTitle)
        editTodo(id, itemTitle)
    }
    
    // Избавляюсь от разницы во времени с GMT
    const actualHours = new Date(dueDate).getHours() - (new Date(dueDate).getTimezoneOffset() / 60)
    const actualTimeStamp = new Date(dueDate).setHours(actualHours)
    
    const actualDate = new Date(actualTimeStamp).toLocaleString().slice(0, 17);
    
    if(!isDone){
        return (
            <div className='todo-item' ref={todoElement}>
                {editMode
                    ? <input className='title' type='text' value={itemTitle} ref={titleElement} onChange={(e) => setItemTitle(e.target.value)} />
                    : <input className='title' type='text' readOnly value={title} ref={titleElement} />
                }
                
                {editMode
                    ? <div className="buttons">
                        <p>Due to: <span>{actualDate}</span></p>
                        <div className='edit-buttons'>
                                <button className='btn btn-outline-warning' onClick={() => handleEdit()}><i className="bi bi-x-lg"></i></button>
                                <button className='btn btn-success' onClick={() => applyChanges()}>Apply</button>
                            </div>
                    </div>
                    : <div className="buttons">
                        <p>Due to: <span>{actualDate}</span></p>
                        <button className='btn btn-outline-success' onClick={() => markTodo(id)}><i className="bi bi-check-lg"></i></button>
                        <button className='btn btn-outline-warning' onClick={() => handleEdit()}><i className="bi bi-pencil"></i></button>
                        <button className='btn btn-outline-danger' onClick={() => removeTodo(id)}><i className="bi bi-trash"></i></button>
                    </div>
                }
                
            </div>
        )
    } else{
        return (
            <div className='todo-item todo-item_done' ref={todoElement}>
                <input className='title' type='text' readOnly value={title} />
                <div className="buttons">
                    {isDone && <p>This is complete! Well done!</p>}
                    <button className='btn btn-outline-danger' onClick={() => removeTodo(id)}><i className="bi bi-trash"></i></button>
                </div>
            </div>
        )
    }

  
}

export default TodoItem