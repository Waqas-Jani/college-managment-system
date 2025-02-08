var mongoose = require('mongoose');

var assignmentSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    file_url: {
        type: String
    },
    dead_line: {
        type: String
    },
    class: {
        id: String,
        name: String
    },
    subject: {
        id: String,
        name: String
    },
    createdAt: { type: Date, default: Date.now },

});
module.exports = mongoose.model('Assignments', assignmentSchema);