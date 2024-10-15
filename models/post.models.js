const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
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
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { 
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
 },
});

module.exports = mongoose.model('Post', postSchema);