const {db} = require("./../../db");

const addStudent = async (req, res) => {
    let student = req.body;
    student = await db.one('INSERT INTO students(first_name, last_name, city, age) VALUES(${firstName}, ${lastName}, ${city}, ${age}) RETURNING *', student);
    res.status(200).json({
        student,
        message: "Student added",
        timestamp: new Date().toString()
    })
} // End of addStudent() function

const getStudents = async (req, res) => {
    let students = await db.any("SELECT * FROM students");

    if(students.length) {
        res.json({
            students,
            message: "Students retrieved",
            timestamp: new Date().toString()
        })
    } else {
        res.json({
            error: "No students found",
            timestamp: new Date().toString()
        })
    }
} // End of getStudents() function

const updateStudent = async (req, res) => {
    let {firstName, lastName, age, city} = req.query;
    let {id} = req.params;
    if(firstName) {
        let updatedStudent = await db.one('UPDATE students SET first_name=$1 WHERE id=$2 RETURNING *', [firstName, id]);
        res.status(200).json({
            updated: updatedStudent,
            message: "Updated first name",
            timestamp: new Date().toString()
        })
    } else if(lastName) {
        let updatedStudent = await db.one('UPDATE students SET last_name=$1 WHERE id=$2 RETURNING *', [lastName, id]);
        res.status(200).json({
            updated: updatedStudent,
            message: "Updated last name",
            timestamp: new Date().toString()
        })
    } else if(age) {
        let updatedStudent = await db.one('UPDATE students SET age=$1 WHERE id=$2 RETURNING *', [age, id]);
        res.status(200).json({
            updated: updatedStudent,
            message: "Updated age",
            timestamp: new Date().toString()
        })
    } else if(city) {
        let updatedStudent = await db.one('UPDATE students SET city=$1 WHERE id=$2 RETURNING *', [city, id]);
        res.status(200).json({
            updated: updatedStudent,
            message: "Updated city",
            timestamp: new Date().toString()
        })
    }
} // End of updateStudent() function

module.exports = {addStudent, getStudents, updateStudent};