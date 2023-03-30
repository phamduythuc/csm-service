const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const validator = require('validator')
const userAppSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    email: {
        type: String,
        required: [true, "Please provide a valid email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
        validate: {
          validator: function (el) {
              return el === this.password
          },
            message: 'Passwords are not the same!'
        }
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
});

userAppSchema.pre('save', async function(next)  {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
})
userAppSchema.methods.correctPassword = async (candidatePassword, userPassword)=> {
    return bcrypt.compare(candidatePassword, userPassword);
}
userAppSchema.methods.changePasswordAfter = function (jwt) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt / 1000 , 10);
        return jwt < changedTimestamp
    }
    return false;
}

const UserApp = mongoose.model('UserApp', userAppSchema);
module.exports = UserApp;