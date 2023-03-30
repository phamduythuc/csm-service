const mongoose = require('mongoose');
const listCourse = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        image: {
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
            type: Number,
        },
        averageTotal: {
            type: Number,
        },
        tags: {
            type: String,
        }
    }
)

const Course = mongoose.model('listCourse', listCourse)

module.exports = Course;