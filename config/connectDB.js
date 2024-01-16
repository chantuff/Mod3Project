// Load env variables
if (process.env.NODE_ENV != "production"){
    require('dotenv').config();
    }

const mongoose = require('mongoose');

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database');
}
catch (err) {
    console.log(err);
}
}

module.exports = connectDB;