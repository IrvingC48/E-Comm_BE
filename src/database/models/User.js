const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    userName: String,
    password: {
        type: String,
        required: true
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ],
    signUpDate: {
        type: Date,
        default: Date.now()
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save', function(next) {
    let user = this;
    if (user.roles.length !== 0) return next();

    bcrypt.genSalt(12).then(salts => {
        bcrypt.hash(user.password, salts).then(hash => {
            user.password = hash;
            next();
        })
    }).catch(error => next(error));
});

module.exports = mongoose.model('User', UserSchema);
