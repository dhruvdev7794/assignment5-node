module.exports = function (app) {
    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.get('/api/student/section', findSectionsForStudent);
    app.delete('/api/section/:sectionId', deleteSection);
    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
    app.delete('/api/section/:sectionId/enrollment', unenrollStudentFromSection);

    var sectionModel = require('../models/sections/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function deleteSection(req, res){
        var sectionId = req.params['sectionId'];
        sectionModel.deleteSection(sectionId)
            .then(result => res.send(result));
    }

    function findSectionsForStudent(req, res){
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        enrollmentModel.findSectionsforStudent(studentId)
            .then(function (enrollments) {
                res.send(enrollments);
            })
    }

    function createSection(req, res){
        var section = req.body;
        sectionModel.createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }

    function findSectionsForCourse(req, res) {
        var courseId = req.params['courseId'];
        sectionModel.findSectionsForCourse(courseId)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function enrollStudentInSection(req, res) {
        var sectionId = req.params['sectionId'];
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;

        var enrollment = {
            studentId: studentId,
            sectionId: sectionId
        };

        sectionModel.decrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel.enrollStudentsInSection(enrollment);
            })
            .then(function (enrollment) {
                res.json(enrollment);
            });

    }

    function unenrollStudentFromSection(req, res) {
        var sectionId = req.params['sectionId'];
        // var currentUser = req.session.currentUser;
        // var studentId = currentUser._id;
        // var enrollment = {
        //     studentId: studentId,
        //     sectionId: sectionId
        // };

        sectionModel.incrementSectionSeats(sectionId)
            .then(function () {
                enrollmentModel.unenrollStudentsFromSection(sectionId)
            })
            .then(function (enrollment) {
                res.send(enrollment);
            })
    }

}