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
        )
    }
}

const enrollStudent = (req, res, next) => {
    try {
        let student = school.enrollStudent(req.body)
        res.json({
            student,
            status: "Success",
            message: "Student has been enrolled for brain-washing at our prestigious institution"
            timestamp: new Date().toString()
        })

    } catch (error) {
        next(res.status(500).json({
            error
        })
    )}
}

const 