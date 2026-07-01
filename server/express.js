// The express.js file sets up the Express application and configures middleware for handling requests. It includes body-parser for parsing JSON and URL-encoded data, cookie-parser for handling cookies, compression for gzip compression, helmet for security headers, and cors for enabling Cross-Origin Resource Sharing. The configured Express app is then exported for use in the server entry point (index.js).
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import authRoutes from './Routes/auth.routes.js'
import userRoutes from './Routes/user.routes.js'
import contactRoutes from './Routes/contact.routes.js'
import educationRoutes from './Routes/education.routes.js'
import projectRoutes from './Routes/project.routes.js'
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', contactRoutes)
app.use('/', educationRoutes)
app.use('/', projectRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
})

export default app


