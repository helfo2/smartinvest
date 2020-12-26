import cors from "cors"
import express from "express"
import todoRoutes from "./routes"
import mongoose from "mongoose"

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(todoRoutes)

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.mehso.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () => 
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })