import User from "../models/User.js"
import bcrypt from "bcrypt"
import createError from "../utils/createError.js"
import jwt from 'jsonwebtoken'

export const register = async (req,res,next) => {
    try{
        const user = User.findOne({email: req.body.email})
        if(!user) return next(createError(403, 'User Already Exists!'))

        const hashPassword = bcrypt.hashSync(req.body.password, 10)

        const newUser = new User({
            ...req.body,
            password: hashPassword
        })

        newUser.save()

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '5d'})

        res.status(201).send({
            _id: newUser._id,
            username: newUser.username,
            email: newUser._id,
            profilePicture: user.profilePicture,
            token: token 
        })

    }catch(err){
        next(err)
    }
}

export const login = async (req,res,next) => {
    try{
        console.log(req.body)
        const user = await User.findOne({email: req.body.email})
        if (!user) return next(createError(404, 'User not found!')) 

        const passwordMatch = bcrypt.compareSync(req.body.password, user.password)

        if(!passwordMatch) return next(createError(403, 'Invalid Creadentials!'))

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '5d'})


        res.status(201).send({ 
            _id: user._id,
            email: user.email,
            username: user.username,
            profilePicture: user.profilePicture,
            token: token
            
        })

    }catch(err){
        next(err)
    }
}