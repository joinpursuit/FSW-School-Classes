const {db} = require("./../../db");

const addTeacher = async (req, res) => {
    let teacher = req.body;
    let {first, last} = teacher;
    if(await isTeacherExisting(teacher)) {
        res.json({
            error: "A teacher by that name exists",
            timestamp: new Date().toString()
        })
    } else {
        let added = await db.one('INSERT INTO teachers (first_name, last_name) VALUES ($1, $2) RETURNING *', [first, last]);
        res.json({
            added,
            message: "Teacher successfully added",
            timestamp: new Date().toString()
        })
    }
} // End of addTeacher() function

const getTeachers = async (req, res) => {
    let teachers = await db.any("SELECT * FROM teachers");

    if(teachers.length) {
        res.json({
            teachers,
            message: "Teachers grabbed",
            timestamp: new Date().toString()
        });
    } else {
        res.json({
            error: "No teachers found",
            timestamp: new Date().toString()
        })
    }
} // End of getTeachers() function

module.exports = {addTeacher, getTeachers}