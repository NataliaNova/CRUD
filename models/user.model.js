const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        
    },
    email: {
        type: String,
        required: true,
        //unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        trim: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, { 
    timestamps: true,

    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret.password;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
 },
});

userSchema.methods.checkPassword = function(password) {
 return bcrypt.compare(password, this.password);
};


userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        });
    } else {
        next();
    };
});



module.exports = mongoose.model('User', userSchema);