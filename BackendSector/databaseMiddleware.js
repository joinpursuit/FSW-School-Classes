let school = require("./databaseSchool");

const addClass = (req, res, next) => {
    try {
        let newClass = school.addClass(req.body.name, req.body.teacher)
        res.json({
            newClass,
            status: "Success",
            message: "Class Has Been Approved for Indoctrination at NRES",
            timestamp: new Date().toString()
        })
    } catch (error) {
        next(res.status(500).json({
            error
        })
    )}
}

const enrollStudent = (req, res, next) => {
    debugger
    try {
        let student = school.enrollStudent(req.params.className, req.body)
        res.json({
            student,
            status: "Success",
            message: "Student has been enrolled for brain-washing at our prestigious institution",
            timestamp: new Date().toString()
        })
    } catch (error) {
        next(res.status(500).json({
            error
        })
    )}
}

const studentFilter = (req, res, next) => {
    try {
        let filter = school.getStudentsByClassWithFilter(req.params.className, req.query.city, req.query.fail)
        res.json({
            filter,
            status: "Success",
            message: "Students Indoctrinated at Our Institution",
            timestamp: new Date().toString()
        })

    } catch (error) {
        next(res.status(500).json({
            error
        })
    )}
}

module.exports = {addClass, enrollStudent, studentFilter}