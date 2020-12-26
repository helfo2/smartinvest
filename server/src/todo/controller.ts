import { ITodo } from "./type"
import Todo from "./model" 
import { Request, Response } from "express"

const getTodos = async(req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find()
    res.status(200).json({ todos })
  } catch (error) {
    throw error
  }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">

    console.log("REQUEST BODY ", req.body)

    const todo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status
    })

    const newTodo = await todo.save()
    const allTodos = await Todo.find()

    res
      .status(201)
      .json({
        message: "Todo added",
        todo: newTodo,
        todos: allTodos
      })
  } catch (error) {
    throw error
  }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = req

    const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    )

    const allTodos = await Todo.find()
    res.status(200).json({
      message: "Todo updated",
      todo: updatedTodo,
      todos: allTodos
    })
  } catch (error) {
    throw error
  }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(
      req.params.id
    )

    const allTodos: ITodo[] | null = await Todo.find()

    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos
    })
  } catch(error) {
    throw error
  }
}

export { getTodos, addTodo, updateTodo, deleteTodo }