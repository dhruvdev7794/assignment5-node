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

function unenrollStudentsFromSection(enrollment) {
    console.log(enrollment);
    return enrollmentModel.deleteOne({
        studentId: enrollment.studentId,
        sectionId: enrollment.sectionId
    });
}

var api ={
    enrollStudentsInSection: enrollStudentsInSection,
    findSectionsforStudent: findSectionsforStudent,
    unenrollStudentsFromSection: unenrollStudentsFromSection
}

module.exports = api;