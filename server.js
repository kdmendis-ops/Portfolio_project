// The server.js file is the entry point for the backend server. It imports necessary modules, connects to the MongoDB database using Mongoose, and starts the Express server on the specified port. It also includes error handling for database connection issues and defines a simple route for the root URL that returns a welcome message in JSON format.



import config from './config/config.js'
import app from './server/express.js'
import mongoose from 'mongoose'
// Use the native Promise implementation for Mongoose's async operations.
mongoose.Promise = global.Promise
// Open the connection to MongoDB using the URI from config.
mongoose.connect(config.mongoUri, {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to the database!");
    })

// If the connection drops or fails after the initial connect, fail loudly.
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`)
})
// Start listening for HTTP requests on the configured port.
app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})
