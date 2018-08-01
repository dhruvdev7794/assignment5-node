var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var ObjectId = require('mongodb').ObjectId;

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

function unenrollStudentsFromSection(sectionId, studentId) {
    return enrollmentModel.remove({
        sectionId: sectionId,
        studentId: studentId
    })
}

function findEnrollmentforSection(enrolllment) {
    return enrollmentModel.find(enrolllment);
}

var api ={
    enrollStudentsInSection: enrollStudentsInSection,
    findSectionsforStudent: findSectionsforStudent,
    unenrollStudentsFromSection: unenrollStudentsFromSection,
    findEnrollmentforSection: findEnrollmentforSection
}

module.exports = api;