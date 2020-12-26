import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { addTodo, deleteTodo, getTodos, updateTodo } from './API';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = () => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch(err => console.log(err))
  }

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo) => {
    e.preventDefault()
    addTodo(formData)
      .then(( { status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved")
        }
        setTodos(data.todos)
      })
      .catch(err => console.log(err))
  }

  const handleUpdateTodo = (todo: ITodo) => {
    updateTodo(todo)
      .then(({ status, data}) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated")
        }

        setTodos(data.todos)
      })
      .catch(err => console.log(err))
  }

  const handleDeleteTodo = (_id: string) => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200)  {
          throw new Error("Error! Todo not deleted")
        }

        setTodos(data.todos)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {
        todos.map((todo: ITodo) => (
          <TodoItem 
            key={todo._id}
            updateTodo={handleUpdateTodo}
            deleteTodo={handleDeleteTodo}
            todo={todo}
          />
        ))
      }
    </div>
  );
}

export default App;
