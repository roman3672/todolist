import React, {useEffect, useState} from 'react';
import '../styles/todolist.scss'
import { Container } from 'reactstrap';
import { ITodo } from '../interfaces';
import TodoForm from './todolist/TodoForm';
import TodoItem from './todolist/TodoItem';
import axios from "axios";
import {TailSpin} from "react-loader-spinner";
import PopupError from "./PopupError";

const TodoList = () => {
  const [title, setTitle] = useState<string>('')
  const [dueDate, setDueDate] = useState<Date>(new Date())
  const [todos, setTodos] = useState<ITodo[]>([]) 
  const [loader, setLoader] = useState<boolean>(false)
  const [popupError, setPopupError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [searchingString, setSearchingString] = useState<string>('')
  
  const handleError = (message: string) => {
    setPopupError(true)
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
      setPopupError(false)
    }, 4000)
  } 
 
  // Fetching todos on page load
  useEffect(() => {
    fetchTodos()
  }, [])
  
  
  const fetchTodos = async () => {
    setLoader(true)
    await axios.get('https://localhost:7120/api/Todos', {params: {searchingString: searchingString}})
        .then(res => {
          const sortedTodos = [...res.data].sort((a, b) => Number(a.isDone) - Number(b.isDone))
          setTodos(sortedTodos)
          setLoader(false)
        })
  }
  
  const addTodo = async () => {
    if(title === ''){
      handleError('Title is empty!')
    } else {
      if(new Date() > dueDate){
        handleError('Due date is in the past!')
      } else {
        const newTodo = {
          title: title,
          isDone: false,
          dueDate: dueDate
        }
        setDueDate(new Date())
        setTitle('')
        await axios.post<ITodo>(
            'https://localhost:7120/api/Todos',
            newTodo
        ).then(() => {
          setSearchingString('')
          fetchTodos()
        })
      }
    }
  }

  const markTodo = async (id?: number) => {
    await axios.put<boolean>(
        `https://localhost:7120/api/Todos/mark/${id}`,
        {isDone: true}
    ).then(() => {
      setSearchingString('')
      fetchTodos()
    })
  }
  
  const editTodo = async (id?: number, title?: string, dueDate?: Date) => {
    await axios.put<string>(
        `https://localhost:7120/api/Todos/edit/${id}`,
        {title: title, dueDate: dueDate}
    ).then(() => {
      setSearchingString('')
      fetchTodos()
    })
  }

  const removeTodo = async (id: number | undefined) => {
    await axios.delete<ITodo>(
        `https://localhost:7120/api/Todos/${id}`
    ).then(() => {
      setSearchingString('')
      fetchTodos()
    })
  }
  
  // Handling search
  useEffect(() => {
    console.log(searchingString)
    fetchTodos()
  }, [searchingString])
  
  

  
  return (
    <div>
      {popupError && <PopupError message={errorMessage} setPopupError={setPopupError} />}
      <Container className='todolist-container'>
        <TodoForm title={title} setTitle={setTitle} dueDate={dueDate} setDueDate={setDueDate} addTodo={addTodo} />
       
          <input type="text" className="form-control search-input" placeholder="Search..." aria-describedby="basic-addon2" value={searchingString} onChange={(e) => setSearchingString(e.target.value)} />
        {todos.length === 0 && <h3 className='todolist-empty'>You don't have any Todos yet!</h3>}
        <div className="todolist-actual">
          {todos.map((e, i) => {
            if(!e.isDone) {
              return <TodoItem key={i} id={e.id} title={e.title} isDone={e.isDone} dueDate={e.dueDate} removeTodo={removeTodo} markTodo={markTodo} editTodo={editTodo} handleError={handleError} />
            }
          })}
        </div>
        <div className="todolist-marked">
          {todos.map((e, i) => {
            if(e.isDone) {
              return <TodoItem key={i} id={e.id} title={e.title} isDone={e.isDone} dueDate={e.dueDate} removeTodo={removeTodo} markTodo={markTodo} editTodo={editTodo} />
            }
          })}
        </div>
        
        {loader && 
            <TailSpin 
                wrapperClass='spinner-loader'
                height="80"
                width="80"
                color="#82A8F4"
                ariaLabel="tail-spin-loading"
                radius="1" 
            />}
      </Container>
    </div>
  );
}

export default TodoList
