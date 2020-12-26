import { useState } from "react"

type Props = {
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void
}

const AddTodo: React.FC<Props> = ({ saveTodo }): JSX.Element => {
  const [formData, setFormData] = useState<ITodo | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value
    })
  }

  return (
    <form className='Form' onSubmit={(e) => saveTodo(e, formData)}>
      <div>
        <div /* Name */>
          <label htmlFor='name'>Name</label>
          <input onChange={handleForm} type='text' id='name' />
        </div>

        <div /* Description */>
          <label htmlFor='description'>Description</label>
          <input onChange={handleForm} type='text' id='description' />
        </div>
      </div>
      <button disabled={formData === undefined}>Add Todo</button>
    </form>
  )
}

export default AddTodo