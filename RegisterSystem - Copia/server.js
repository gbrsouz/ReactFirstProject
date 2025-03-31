import express from 'express'
import routesPublic from './routesPP/routesPublic.js'
import routesPrivate from './routesPP/routesPrivate.js'
import auth from './middlewares/auth.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/', routesPublic)
app.use('/', auth, routesPrivate)

app.listen(1111, () => console.log('server running'))

// Username: gbrsouza
// Password: 7fPeGQBObqCGVK7a

// mongodb+srv://gbrsouza:7fPeGQBObqCGVK7a@grs.jzuhy.mongodb.net/?retryWrites=true&w=majority&appName=grs
