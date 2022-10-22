import React, {useEffect, useLayoutEffect, useState} from 'react';
import '../styles/todolist.scss'
import { Container } from 'reactstrap';
import { ITodo } from '../interfaces';
import TodoForm from './todolist/TodoForm';
import TodoItem from './todolist/TodoItem';
import axios from "axios";
import {TailSpin} from "react-loader-spinner";

const TodoList = () => {
  const [title, setTitle] = useState<string>('')
  const [dueDate, setDueDate] = useState<Date>(new Date())
  const [todos, setTodos] = useState<ITodo[]>([])
  const [loader, setLoader] = useState<boolean>(false)

  useEffect(() => {
    fetchTodos()
  }, [])
  
  
  const fetchTodos = async () => {
    setLoader(true)
    await axios.get('https://localhost:7120/api/Todos')
        .then(res => {
          const sortedTodos = [...res.data].sort((a, b) => Number(a.isDone) - Number(b.isDone))
          console.log(sortedTodos)
          setTodos(sortedTodos)
          setLoader(false)
        })
  }


  
  const addTodo = async () => {
    if(title === '') {
      console.error("Title field is empty!")
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
      ) .then(() => {
        console.log('Todo added')
        fetchTodos()
      })
    }
    
  }

  const markTodo = async (id?: number) => {
    await axios.put<boolean>(
        `https://localhost:7120/api/Todos/mark/${id}`,
        {isDone: true}
    ).then(() => {
      console.log('Todo marked')
      fetchTodos()
    })
    
  }
  
  
  const editTodo = async (id?: number, title?: string) => {
    await axios.put<string>(
        `https://localhost:7120/api/Todos/edit/${id}`,
        {title: title}
    ).then(() => {
      console.log('Todo edited')
      fetchTodos()
    })
    
  }

  const removeTodo = async (id: number | undefined) => {
    await axios.delete<ITodo>(
        `https://localhost:7120/api/Todos/${id}`
    ).then(() => {
      console.log('Todo removed')
      fetchTodos()
    })
  }

  
  return (
    <div>
      <Container className='todolist-container'>
        <TodoForm title={title} setTitle={setTitle} dueDate={dueDate} setDueDate={setDueDate} addTodo={addTodo} />
        {todos.length === 0 && <h3 className='todolist-empty'>You don't have any Todos yet!</h3>}
        <div className="todolist-actual">
          {todos.map((e, i) => {
            if(!e.isDone) {
              return <TodoItem key={i} id={e.id} title={e.title} isDone={e.isDone} dueDate={e.dueDate} removeTodo={removeTodo} markTodo={markTodo} editTodo={editTodo} />
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
