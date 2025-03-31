import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

//List of users
router.get('/listUsers', async (req, res) => {
    try{
        const users = await prisma.user.findMany({ omit: { password: true } })

        res.status(200).json({message: "Users listed successfully", users})
    }
    catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server error, try again' })
    }
})

export default router