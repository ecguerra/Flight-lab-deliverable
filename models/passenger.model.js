const mongoose = require('mongoose')

const Passenger = mongoose.model (
    'Passenger',
    new mongoose.Schema({
        firstName: String,
        lastName: String,
        dob: Date
    })
)

module.exports = Passenger