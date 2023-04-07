const mongoose = require('mongoose');
const listCourse = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 16
        },
        image: {
            required: true,
            type: String,
        },
        author: {
            type: String,
        },
        price: {
            type: Number,
        },
        priceDiscount: {
            type: Number,
        },
        rating: {
            required: true,
            type: Number,
        },
        averageTotal: {
            type: Number,
        },
        view: {
            type: Number
        },
        time: {
            type: Number
        },

        tags: {
            type: String,
        }
    }
)

const Course = mongoose.model('listCourse', listCourse)

module.exports = Course;