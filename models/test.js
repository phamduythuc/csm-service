const mongoose = require('mongoose');
const courseSchmen = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "require nhe"],
        unique: true
    }
})
const Course = mongoose.model('courses', courseSchmen);
module.exports = Course