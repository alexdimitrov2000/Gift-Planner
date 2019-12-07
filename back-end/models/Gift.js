const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const giftSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Gift name is required'],
        minlength: [3, 'Gift name must be at least 3 characters long.']
    },
    imageUrl: {
        type: String,
        required: [true, 'Gift image is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    givers: [{ type: ObjectId, ref: 'User' }]
});

module.exports = new Model('Gift', giftSchema);