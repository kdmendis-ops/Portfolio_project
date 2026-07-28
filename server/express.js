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
import shopRoutes from './Routes/shop.routes.js'
import productRoutes from './Routes/product.routes.js'
const app = express()
// Parse incoming JSON and URL-encoded request bodies into req.body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Mount each feature's routes at the app root; each router defines its own paths.
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', contactRoutes)
app.use('/', educationRoutes)
app.use('/', projectRoutes)
app.use('/', shopRoutes)
app.use('/', productRoutes)
// Note: body-parser is redundant with express.json()/urlencoded() above,
// kept here from an older Express version's setup.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// Parse cookies on incoming requests into req.cookies.
app.use(cookieParser())
// Gzip-compress responses to reduce payload size.
app.use(compress())
// Set a collection of security-related HTTP headers.
app.use(helmet())
// Allow cross-origin requests (needed since the client runs on a different port).
app.use(cors())
// Centralized error handler: express-jwt throws 'UnauthorizedError' when a
// route's JWT check fails, so that gets its own 401; everything else is a 400.
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
})

export default app


