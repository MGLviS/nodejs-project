const mongoose = require("mongoose");

const intemSchema = new mongoose.Schema({

    name: String,
    quantity: Number,

});

module.exports = mongoose.model('Item',intemSchema);