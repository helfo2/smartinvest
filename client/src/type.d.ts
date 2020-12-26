interface ITodo {
  _id: string
  name: string
  description: string
  status: boolean
  createdAt?: string
  updatedAt?: string
}

interface ITodoProps {
  todo: ITodo
}

type ApiDataType = {
  message: string
  status: string
  todos: ITodo[]
  todo?: ITodo
}