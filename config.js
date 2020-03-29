module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGO_URI || 'mongodb://mongo:27017/factory'
};