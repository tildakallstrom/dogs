const mongoose = require('mongoose');
//const router = express.Router();

//schema for db with all the inputs
const dogsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    breed: {
        type: String,
        required: true

    },
    age: {
        type: String,
        required: true

    },
    sex: {
        type: String,
        required: true

    },
    merits: {
        type: String,
        required: true

    },
    father: {
        type: String,
        required: true

    },
    mother: {
        type: String,
        required: true

    },
    addedDate: {
        type: Date,
        required: true,
        default: Date.now

    }
})

module.exports = mongoose.model('Dog', dogsSchema)