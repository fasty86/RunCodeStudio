import express from 'express'
import { getComments } from '../controllers/commentController'

const commentsRouter = express.Router()

commentsRouter.get('/posts/:postId/comments', getComments)

export default commentsRouter
