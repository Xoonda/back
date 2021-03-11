const mongoose = require('mongoose');
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        default: ''
    }
})

models.export = mongoose.model('categories', categorySchema)