let school = require("./databaseSchool");

const addClass = (req, res, next) => {
    try {
        let newClass = school.addClass(req.body)
        res.json

    } catch (error) {
        next(res.json({
            status: error,
            message: `${} added to NRES`
            

        }))
    }
}