import List from "../models/Lists.js"

export const createList = async (req,res,next) => {
    try{
        const newList = new List({
            userId: req.user,
            ...req.body
        })

        await newList.save()

        res.status(201).send(newList)
    }catch(err){
        next(err)
    }
}

export const getLists = async (req,res,next) => {
    try{
        const lists = await List.find({userId: req.user})
        
        res.status(200).json(lists)
    }catch(err){
        next(err)
    }
}

export const getList = async (req,res,next) => {
    try{
        const list = await List.findOne({_id: req.params.listId})

        res.status(200).json(list)
    }catch(err){
        next(err)
    }
}

export const updateList = async (req,res,next) => {
    try{
        const list = await List.findOneAndUpdate({_id: req.params.listId}, {...req.body}, {new: true})

        res.status(200).send(list)

        
    }catch(err){
        next(err)
    }
}

export const deleteList = async (req,res,next) => {
    try{
        const list = await List.findOneAndDelete({_id: req.params.listId})

        res.status(200).send(list)
        
    }catch(err){
        next(err)
    }
}
