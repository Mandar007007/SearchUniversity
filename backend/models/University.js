const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:String,
    email:String,
});

module.exports = mongoose.model('University', universitySchema);
