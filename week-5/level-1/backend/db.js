const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:1234567890@cluster0.ic2u2vh.mongodb.net/buisnessCards');

const cardSchema = new mongoose.Schema({
    id:Number,
    title: String,
    sd: String,
    interests: Array,
    linkedIn: String,
    twitter:String
})

const card = mongoose.model('card', cardSchema);

module.exports = { card };