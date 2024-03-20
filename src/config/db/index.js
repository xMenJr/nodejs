const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/MyDB');
        console.log('Connect successfully !')   
    }
    catch {
        console.log('Connect fail !')
    }
}

module.exports = { connect }