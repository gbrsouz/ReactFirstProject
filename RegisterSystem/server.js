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
