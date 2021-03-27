const mongoose = require("mongoose")
const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    word_type: {
        type: String,
        default: null
    },
    plural: {
        type: String,
        default: null
    },
    definition: {
        type: String,
        default: null
    },
    example: {
        type: String,
        default: null
    },
    synonyms: {
        type: Array,
        default: []
    }
    ,
    timeUploaded: {
        type: Date,
        default: Date.now()
    },
    approved: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("Word", wordSchema);