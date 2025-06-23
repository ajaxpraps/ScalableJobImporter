const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
    const URL = process.env.DB_URL;
    try {
        await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connect();