import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { checkDatabaseConnection } from './db'
import postRouter from './routes/posts'
import commentsRouter from './routes/comments'
import { sanitizeInput } from './middlewares/sanitize'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

const startServer = async () => {
  try {
    const isConnected = checkDatabaseConnection()
    if (!isConnected) {
      throw new Error('Database connection failed')
    }

    app.use(express.json())
    app.use(sanitizeInput)

    app.use('/api', postRouter)
    app.use('/api', commentsRouter)

    app.get('/', (_, res) => {
      res.json('👋 Howdy from the server :)')
    })

    app.listen(port, () => {
      console.info(`  ➜ 🎸 Server is listening on port: ${port}`)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

startServer()
