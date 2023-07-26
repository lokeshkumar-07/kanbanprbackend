import createError from "../utils/createError.js"
import jwt from 'jsonwebtoken'

export const verifyToken = async (req,res,next) => {
    try{
        const token = req.header('auth-token')
        
        if(!token) return next(createError(403, 'Access Denied!'))

        const varifiedToken = jwt.verify(token, process.env.JWT_SECRET)

        req.user = varifiedToken.id

        next()
    }catch(err){
        next(err)
    }
}