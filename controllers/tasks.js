import Tasks from "../models/Tasks.js"

export const createTask = async (req,res,next) => {
    console.log(req.body)
    try{
        const task = new Tasks({
            ...req.body,
            userId: req.user
        })

        await task.save()

        res.status(201).send(task)
    }catch(err){
        next(err)
    }
}

export const getTask = async (req,res,next) => {
    try{
        const task = await Tasks.findOne({_id: req.params.taskId})
        
        res.status(200).send(task)
    }catch(err){
        next(err)
    }
}

export const getTasks = async (req,res,next) => {
    try{
        const tasks = await Tasks.find({listId: req.params.listId})
        
        res.status(200).send(tasks)
    }catch(err){
        next(err)
    }
}

export const updateTask = async (req,res,next) => {
    try{
        const task = await Tasks.findOneAndUpdate({_id: req.params.taskId}, {...req.body}, {new:true})

        res.status(200).send(task)
    }catch(err){
        next(err)
    }
}

export const deleteTask = async (req,res,next) => {
    try{
        const task = await Tasks.findOneAndDelete({_id: req.params.taskId})

        res.status(200).send(task)
    }catch(err){
        next(err)
    }
}