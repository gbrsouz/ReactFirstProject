import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

//Register
router.post('/register', async (req, res) => {
    try{
        const user = req.body

        const salt = await bcrypt.genSalt(10)
        const hasPassword = await bcrypt.hash(user.password, salt)

        const userDB = await prisma.user.create({
            data:{
                email: user.email,
                name: user.name,
                password: hasPassword,
            },
        })

        res.status(201).json(userDB)
    }
    catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server error, try again' })
    }
})

//Login
router.post('/login', async (req, res) =>{
    try{
        const userInfo = req.body

        // Search for the user
        const user = await prisma.user.findUnique({ 
            where: { email: userInfo.email } 
        })

        // Verify the user existence
        if(!user){
            return res.status(404).json({ message: 'User not found' })
        }

        // compare the encrypted password with the original
        const isMatch = await bcrypt.compare(userInfo.password, user.password)

        if(!isMatch){
            return res.status(400).json({ message: 'Invalid Password' })
        }

        //generate JWT token
        const token = jwt.sign({ id: user.id}, JWT_SECRET, { expiresIn: '1d'})
        res.status(200).json(token)
    }
    catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server error, try again' })
    }
})

export default router