var mongoose = require('mongoose');

var AttendenceSchema = mongoose.Schema({
    classId: String,
    subId: String,
    subName: String,
    stdId: String,
    stdName: String,
    date: String,
    status: String,


});
module.exports = mongoose.model('Attendence', AttendenceSchema);