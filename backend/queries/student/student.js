const {db} = require("../../db.js");

const findStudentById = async (id) => {
    try {
        return await db.any('SELECT * FROM students WHERE id=$1', id);  
    } catch (err) {
        console.log(err);
    }
} // End of findStudentById() function

const findStudentByNames = async (firstName, lastName) => {
    try {
        return await db.any('SELECT * FROM students WHERE first_name=$1 AND last_name=$2', [firstName, lastName]);
    } catch (err) {
        console.log(err);
    }
} // End of findStudentByNames() function

const findStudentClasses = async (id) => {
    try {
        return await db.any('SELECT * FROM class_enrollments RIGHT JOIN classes ON ' + 
                            'classes.id=class_enrollments.class_id WHERE student_id=$1', id);
    } catch (err) {
        console.log(err);
    }
} // End of findStudentClasses() function

const getStudentById = async (req, res) => {
    let {id} = req.params;
    let student = await findStudentById(id);
    let studentClasses = await findStudentClasses(id);
    if(student) {
        res.json({
            student,
            classes: studentClasses,
            message: "Retrieved Student",
            timestamp: new Date().toString()
        })
    } else {
        res.json({
            error: "No student found",
            timestamp: new Date().toString()
        })
    }
} // End of getStudentById() function

const getStudentByName = async (req, res) => {
    let {firstName, lastName} = req.params;
    let student = await findStudentByNames(firstName, lastName);

    if(student) {
        if(student.length > 1) {
            res.json({
                students: student,
                message: "Multiple students found",
                timestamp: new Date().toString()
            })
        } else {
            let studentClasses = await findStudentClasses(student[0].id);
            res.json({
                student,
                classes: studentClasses,
                message: "Retrieved student",
                timestamp: new Date().toString()
            })
        }
    } else {
        res.json({
            error: "No student found",
            timestamp: new Date().toString()
        })
    }
    
} // End of getStudentByName() function

const updateStudent = async (req, res) => {
    let {firstName, lastName, age, city} = req.query;
    let {id} = req.params;
    if(firstName) {
        let updatedStudent = await db.any('UPDATE students SET first_name=$1 WHERE id=$2 RETURNING *', [firstName, id]);
        res.json({
            updated: updatedStudent,
            message: "Updated first name",
            timestamp: new Date().toString()
        })
    } else if(lastName) {
        let updatedStudent = await db.any('UPDATE students SET last_name=$1 WHERE id=$2 RETURNING *', [lastName, id]);
        res.json({
            updated: updatedStudent,
            message: "Updated last name",
            timestamp: new Date().toString()
        })
    } else if(age) {
        let updatedStudent = await db.any('UPDATE students SET age=$1 WHERE id=$2 RETURNING *', [age, id]);
        res.json({
            updated: updatedStudent,
            message: "Updated age",
            timestamp: new Date().toString()
        })
    } else if(city) {
        let updatedStudent = await db.any('UPDATE students SET city=$1 WHERE id=$2 RETURNING *', [city, id]);
        res.json({
            updated: updatedStudent,
            message: "Updated city",
            timestamp: new Date().toString()
        })
    }
} // End of updateStudent() function

module.exports = {getStudentById, getStudentByName, updateStudent}