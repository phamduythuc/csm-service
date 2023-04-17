const mongoose = require('mongoose');
const detailCourse = require('./courseDetail')
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
        courseCode: {
            type: String,
            required: true
        }   ,
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
listCourse.post('save', async function(doc) {
    try {
        console.log(doc)
        const courseDetail = new detailCourse()
        courseDetail._id = doc._id
        await courseDetail.save();
    }catch (err) {

    }
})
const Course = mongoose.model('listCourse', listCourse)

module.exports = Course;