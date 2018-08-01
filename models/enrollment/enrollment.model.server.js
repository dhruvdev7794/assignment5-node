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

function unenrollStudentsFromSection(enrollment) {
    // console.log(enrollment.sectionId);
    // console.log(enrollment.studentId);
    // console.log(ObjectId(enrollment.studentId));
    // console.log(typeof ObjectId(enrollment.studentId));

    // findEnrollmentforSection(enrollment)
    //     .then((result) => {
    //         // console.log(result);
    //     })

    console.log({_id: enrollment[0]._id});
    return enrollmentModel.remove({_id: ObjectId(enrollment[0]._id)});
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