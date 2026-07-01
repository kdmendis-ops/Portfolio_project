// The server.js file is the entry point for the backend server. It imports necessary modules, connects to the MongoDB database using Mongoose, and starts the Express server on the specified port. It also includes error handling for database connection issues and defines a simple route for the root URL that returns a welcome message in JSON format.



import config from './config/config.js'
import app from './server/express.js'
import mongoose from 'mongoose'
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
    //useNewUrlParser: true,
    //useCreateIndex: true, 
    //useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to the database!");
    })

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`)
})
app.get("/", (req, res) => {
    res.json({ message: "Welcome to User application." });
});
app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})
