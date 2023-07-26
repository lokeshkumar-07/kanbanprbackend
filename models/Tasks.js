import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    content:{
        type:String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    complected: {
        type: Boolean,
        default: false
    },
    listId: {
        type:String,
        required: true
    },
    userId: {
        type:String,
        required: true
    }
},{
    timestamps: true
})

const Tasks = mongoose.model("Task", TaskSchema)

export default Tasks