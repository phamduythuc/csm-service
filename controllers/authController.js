const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jsonwebtoken = require('jsonwebtoken')
const UserApp = require('../models/userModelApp')
const {promisify} = require('util')
const tokenApp = id => {
    return jsonwebtoken.sign({id: id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
};
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await UserApp.create(req.body);
    const token = tokenApp(newUser._id);
    res.status(201).json({
        status: 'success',
        token: token,
        data: newUser
    })
});
exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return next(new AppError('email password not provided', 400));
    }
    const user = await UserApp.findOne({email}).select('+password');
    console.log(user);
    if (!user || !await user.correctPassword(password, user.password)) {
        return next(new AppError("email of password incorrect", 401));
    }
    const token = tokenApp(user._id);
    res.status(200).json({
        status: 'success',
        token
    })
})
exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('You are not logged in! please login get access', 401));
    }
    const decode = await promisify(jsonwebtoken.verify)(token, process.env.JWT_SECRET);
    console.log(decode)
    const currentUser = await UserApp.findById(decode.id);
    if (!currentUser) {
        return next(new AppError('the user belonging to this token does no longer exist', 401));
    }
    if(currentUser.changePasswordAfter(decode.iat)) {
        return next( new AppError('User recently changed password! please log in again', 401));
    }
    req.user = currentUser;
    next();
})