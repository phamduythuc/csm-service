
const catchAsync = require('../utils/catchAsync');
const  UserApp = require('../models/userModelApp')
exports.getAllUser = catchAsync(async (req, res, next) => {
    const listUser = await UserApp.find();
    res.status(200).json({
        status: 'success',
        data: {
            user: listUser
        }
    })
})
exports.createSourse = catchAsync(async (req, res, next) => {
    // const newSourse = await Course.create(req.body);
    // res.status(200).json({
    //     status: 'success',
    //     course: newSourse
    // })
})