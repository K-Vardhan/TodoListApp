import React, { useState, useEffect } from 'react'
import { TodoFrom } from './TodoFrom'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoFrom } from './EditTodoFrom';
uuidv4();

const getLocalItems = () =>{
  let list = localStorage.getItem('todos')
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem('todos'))
  }else{
    return [];
  }
}

export const TodoWrapper = () => {
  const [todos, setTodos] = useState(getLocalItems())

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    if (todos) {
      setTodos(todos);
    }
  }, [todos]);

  const addTodo = todo => {
    setTodos([...todos, {
      id: uuidv4(), task: todo,
      completed: false,
      isEditing: false
    }])
    console.log(todos);
  }

  const toggleComplete = id => {
    setTodos(todos.map(todo => todo.id === id ?
      { ...todo, completed: !todo.completed } : todo))
  }

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }



  const editTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
  }

  const editTask = (task, id) =>{
    setTodos(todos.map(todo => todo.id === id ? 
      {...todo, task, isEditing: !todo.isEditing} : todo))
  }

  return (
    <div className='TodoWrapper'>
      <h1>Get Things Done!</h1>
      <TodoFrom addTodo={addTodo} />
      {todos.map((todo, index) => (
        todo.isEditing ? (
          <EditTodoFrom editTodo={editTask} task={todo}/>
        ) : (
          <Todo task={todo} key={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo} />
        )

      ))}

    </div>
  )
}
