const mongoose = require('mongoose');

const launcesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    traget: {
        type: String,
        required: true
    },
    costumer: {
        type: [ String ],
        required: true
    },
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true
    },
});

module.exports = mongoose.model('launch', launcesSchema);