const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var validator = require('validator');

var userSchema = new Schema({
    firstName: {type: String,
        validate: {
            validator: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/,
            message: '{VALUE} is not a valid first name',
            isAsync: false
        },
        required: true},
    lastName: {type: String,
        validate: {
            validator: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/,
            message: '{VALUE} is not a valid last name',
            isAsync: false
        },
        required: true},
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        }
    },
    phone: {
        type: Number,
        validate: {
            validator: /^\d{3,10}$/,
            message: '{VALUE} is not a valid phone number',
            isAsync: false
        },
        required: true
    },
    dateBirth: {type: Schema.Types.Date, required: true},
    active: {type: Schema.Types.Boolean, default: true, required: true},
    createAt: {type: Schema.Types.Date, required: true},
    updateAt: {type: Schema.Types.Date, required: true}

});
module.exports = mongoose.model('User', userSchema);