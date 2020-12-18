const mongoose = require('mongoose')

const Airport = mongoose.model (
    "Airport",
    new mongoose.Schema({
        name: String,
        country: String,
        terminals: [],
        opened: Date,
    })
)

module.exports = Airport