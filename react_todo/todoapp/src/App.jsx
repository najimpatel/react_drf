import { useState, useEffect } from "react";
import axios from 'axios'
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Search from "./components/Search";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";



// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'



function App() {
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState("")

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/todos")
    .then(res => setTodos(res.data))
    .catch(err => setErrors(err.message))
  }, [])


// add todo function
  const addTodo = (data) => {
    const originalTodos = [...todos]
    setTodos( [ ...todos, data={...data, id:parseInt(todos[todos.length-1].id) + 1, status:"Active"}] )
    axios.post("http://127.0.0.1:8000/todos", data)
    .then(res => setTodos([...todos, res.data]))
    .catch(err => {
      setErrors(err.message)
      setTodos(originalTodos)
    })
  }

  // delete function
  const delTodo = (id) => {
    setTodos(todos.filter( todo => todo.id != id ))
    const originalTodos = [...todos]
    axios.delete("http://127.0.0.1:8000/todos" + id)
    .catch(err => {
      setErrors(err.message)
      setTodos(originalTodos)
    })
  }


  // update function
  const updateTodo = (e, id, text, todo ) => {
    e.preventDefault()
    // this line helps to get the current todo based on the ID called todoId in TodoList
    
    const updatedUser = { ...todo, task:text, status:"Active" }
    setTodos(todos.map(t => t.id == todo.id ? updatedUser : t))

    // axios.patch()


    const updateTodo = { ...todo, task:text}
    axios.patch("http://127.0.0.1:8000/todos" + id, updateTodo)

  }

  const completeTodo = (e, id, todo ) => {

    if(e.target.checked){
      console.log("okay")
      setTodos(todos.map(todo => todo.id == id ? { ...todo, Completed:true}: todo))

      const updateTodo = { ...todo, Completed:true}
      axios.patch("http://127.0.0.1:8000/todos/" + id, updateTodo)
    }
    else
    {
      console.log("omo")
      setTodos(todos.map(todo => todo.id == id ? { ...todo, Completed:false}: todo))

      const updateTodo = { ...todo, Completed:false}
      axios.patch("http://127.0.0.1:8000/todos/" + id, updateTodo)
    }

   
  }

  const filterTodo = (cat_value) => {
    // setTodos(todos.filter(todo => todo.status == cat_value))
    setTodos(todos.filter((todo) => todo.status == cat_value))
  }


  return (
    <div className="todo-container">
      {errors && <p>{errors}</p>}
      <Search addTodo = { addTodo } />
      <Filter filter_todo = { filterTodo }/>
      <TodoList todos = { todos } delTodo = { delTodo } update_todo = { updateTodo } complete_todo = { completeTodo } filter_todo = { filterTodo } />
    </div>
  );
}


export default App;

