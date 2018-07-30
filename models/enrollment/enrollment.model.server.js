var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');

var enrollmentModel = mongoose.model('EnrollmentModel', enrollmentSchema);

function enrollStudentsInSection(enrollment){
    return enrollmentModel.create(enrollment);
}

function findSectionsforStudent(studentId) {
    return enrollmentModel
        .find({studentId: studentId})
        .populate('sectionId')
        .exec();
}

var api ={
    enrollStudentsInSection: enrollStudentsInSection,
    findSectionsforStudent: findSectionsforStudent
}

module.exports = api;