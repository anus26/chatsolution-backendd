import dotenv from "dotenv"
dotenv.config()
import express from 'express'
import cors from "cors"
import connectDB from "./src/db/index.js"
import messageroute from "./src/Route/Route.chat.js"
import userroute from "./src/Route/Route.user.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
  origin: 'https://chat-solution-isoj.vercel.app',
  credentials: true // agar cookies bhejni hain to
}));
app.use(express.json())

app.use(cookieParser())


app.get('/', (req, res) => {
  res.send('Hello World!')
})
connectDB()

app.use('/api/v1/',messageroute)
app.use('/api/v1/',userroute)
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT }`)
})
