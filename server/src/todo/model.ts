import { ITodo } from "./type";
import { model, Schema } from "mongoose";

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    status: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Todo = model<ITodo>("Todo", todoSchema)
export default Todo