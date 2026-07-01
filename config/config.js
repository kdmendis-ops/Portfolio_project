// config.js stores backend configuration settings, such as database connection strings and server port numbers. It allows you to centralize your configuration and easily manage different environments (development, production, etc.) by using environment variables.
const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://kdmendis_db_user:pass@cluster27227.csahrv4.mongodb.net/Selection?appName=Cluster27227&retryWrites=true&w=majority"}
export default config
