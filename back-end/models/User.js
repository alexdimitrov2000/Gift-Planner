const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username is already taken'],
        minlength: [4, 'Username must be at least 4 characters long.']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, 'Password must be at least 4 characters long.'],
    },
    profilePictureUrl: {
        type: String,
        default: 'https://res.cloudinary.com/dux8m4bux/image/upload/v1575666683/default-profile-icon-24.jpg'
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    gifts: [{ type: ObjectId, ref: 'Gift' }]

});

userSchema.methods = {

    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }

};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

module.exports = new Model('User', userSchema);