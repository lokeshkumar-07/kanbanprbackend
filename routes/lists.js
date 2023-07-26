import express from 'express'
import { createList, deleteList, getList, getLists, updateList } from '../controllers/lists.js'
import { verifyToken } from '../middleware/verifyToken.js'

const listRouter = express.Router()

listRouter.post("/", verifyToken, createList)
listRouter.get("/", verifyToken, getLists)
listRouter.get("/:listId", verifyToken, getList )
listRouter.put("/:listId", verifyToken, updateList)
listRouter.delete("/:listId", verifyToken, deleteList)

export default listRouter