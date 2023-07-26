import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/tasks.js'

const tasksRouter = express.Router()

tasksRouter.post('/', verifyToken, createTask)
tasksRouter.get('/:taskId', verifyToken, getTask )
tasksRouter.get('/all/:listId', verifyToken, getTasks)
tasksRouter.put('/:taskId', verifyToken, updateTask)
tasksRouter.delete('/:taskId', verifyToken, deleteTask)

export default tasksRouter