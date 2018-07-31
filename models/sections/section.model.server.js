var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');

var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId})
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    },{
        $inc: {seats: +1}
    });
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    },{
        $inc: {seats: -1}
    });
}

function deleteSection(sectionId) {
    return sectionModel.remove({
        _id: sectionId
    });
}

var api = {
    createSection: createSection,
    findSectionsForCourse: findSectionsForCourse,
    incrementSectionSeats: incrementSectionSeats,
    decrementSectionSeats: decrementSectionSeats,
    deleteSection: deleteSection
}

module.exports = api;