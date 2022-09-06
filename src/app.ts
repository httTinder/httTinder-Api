import express from 'express'
import 'express-async-errors'
import 'reflect-metadata'
import { errorMiddleware } from './middlewares/error.middleware'
import usersRoutes from './routes/users.routes'

const app = express()

app.use(express.json())

app.use('/user', usersRoutes)

app.use(errorMiddleware)

export default app
