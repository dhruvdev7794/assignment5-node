module.exports = function (app) {

    // Section Services
    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.delete('/api/section/:sectionId', deleteSection);
    app.get('/api/section/:sectionId', getSectionById);
    app.put('/api/section/:sectionId', updateSection);
    app.get('/api/section/:sectionId/enrollment', findEnrollmentforSection);

    // Enrollment Services
    // Different than suggested in the document but student Id in stored in session and hence was not needed
    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
    app.delete('/api/section/:sectionId/unenrollment', unenrollStudentFromSection);
    app.get('/api/student/section', findSectionsForStudent);


    var sectionModel = require('../models/sections/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function deleteSection(req, res){
        var sectionId = req.params['sectionId'];
        sectionModel.deleteSection(sectionId)
            .then(result => res.send(result));
    }

    function getSectionById(req, res) {
        var sectionId = req.params['sectionId'];
        sectionModel.getSection(sectionId)
            .then(result => res.json(result));
    }

    function updateSection(req, res) {
        var sectionObj = req.body;
        sectionModel.updateSection(sectionObj)
            .then(section => res.json(section));
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

    function findEnrollmentforSection(req, res) {
        var sectionId = req.params['sectionId'];

        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var enrollment = {
            studentId: studentId,
            sectionId: sectionId
        };
        enrollmentModel.findEnrollmentforSection(enrollment)
            .then(function (result) {
                res.json(result);
            })
    }

    function unenrollStudentFromSection(req, res) {
        var sectionId = req.params['sectionId'];
        var currentUser = req.session.currentUser;

        return enrollmentModel.unenrollStudentsFromSection(sectionId, currentUser._id)
            .then(() => {
                return sectionModel.incrementSectionSeats(sectionId)
            })
            .then(result => res.send(result));
    }

}