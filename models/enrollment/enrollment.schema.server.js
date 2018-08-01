var mongoose = require('mongoose');

var enrollmentSchema = mongoose.Schema({
    sectionId: {type: mongoose.Schema.Types.ObjectId, ref: 'SectionModel'},
    studentId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    grade: String
}, {collection: 'enrollments'});

module.exports = enrollmentSchema;