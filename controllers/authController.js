const  AppError =  require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jsonwebtoken = require('jsonwebtoken')
const UserApp = require('../models/userModelApp')
const tokenApp = id => {
    return jsonwebtoken.sign({id: id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
};
exports.signup = catchAsync (async (req, res, next) => {
    const newUser = await UserApp.create(req.body);
    const token = tokenApp(newUser._id);
    res.status(201).json({
        status: 'success',
        token: token,
        data: newUser
    })
});
exports.login = catchAsync(async (req, res, next ) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return next(new AppError('email password not provided', 400));
    }
    const user = await UserApp.findOne({email}).select('+password');
    console.log(user);
    if (!user || ! await user.correctPassword(password, user.password)) {
        return next(new AppError("email of password incorrect", 401));
    }
    const token = tokenApp(user._id);
    res.status(200).json({
        status: 'success',
        token
    })
})