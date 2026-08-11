// config.js stores backend configuration settings, such as database connection strings and server port numbers. It allows you to centralize your configuration and easily manage different environments (development, production, etc.) by using environment variables.
const config = {
    // Falls back to 'development' when NODE_ENV isn't set (e.g. running locally).
    env: process.env.NODE_ENV || 'development',
    // Port the Express server listens on.
    port: process.env.PORT || 3000,
    // Secret used to sign/verify JWT auth tokens - override via env var in production.
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    // MongoDB connection string; the hardcoded fallback is only for local/demo use.
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://kdmendis_db_user:QJ7F3mv3zTpZgE2e@cluster27227.csahrv4.mongodb.net/?appName=Cluster27227"}
export default config
