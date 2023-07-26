import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import multer from 'multer'
import {fileURLToPath} from 'url'
import path from 'path'
import { register } from "./controllers/auth.js";
import authRouter from "./routes/auth.js";
import listRouter from "./routes/lists.js";
import tasksRouter from "./routes/tasks.js";

dotenv.config()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(cors())

app.use('/assets', express.static(path.join(__dirname , 'public/assets')))

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null , 'public/assets')
    },
    filename: function(req,file,cb) {
        const profilePicture = new Date().toISOString().replace(/:/g ,'-') + file.originalname
        req.body.profilePicture = profilePicture
        cb(null , profilePicture)
    }
})

const upload = multer({storage})

app.use('/api/auth/register', upload.single('picture'), register)
app.use('/api/auth', authRouter)
app.use('/api/lists', listRouter)
app.use('/api/tasks', tasksRouter)


app.use((err,req, res, next) => {
    const errStatus = err.status || 403
    const errMessage = err.message || 'Something went wrong!'

    return res.status(errStatus).json({
        status : errStatus,
        success: false,
        message: errMessage,
        stack: err.stack
    })
})

mongoose.connect(MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
})



