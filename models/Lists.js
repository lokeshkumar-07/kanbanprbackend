import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
)

const List = mongoose.model('List', ListSchema)

export default List