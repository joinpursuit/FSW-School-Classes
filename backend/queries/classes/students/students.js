const {db} = require("./../../../db");

const isClassExisting = async (classId) => {
    try {
        let found = await db.any("SELECT * FROM classes WHERE id=$1", classId);

        if(found.length) {
            return true;
        } else {
            return false;
        }
    } catch(err) {
        console.log(err);
    }
} // End of isClassExisting() function

const isStudentExisting = async (studentId) => {
    try {
        let found = await db.any("SELECT * FROM students WHERE id=$1", studentId);

        if(found.length) {
            return true;
        } else {
            return false;
        }
    } catch(err) {
        console.log(err);
    }
} // End of isStudentExisting() function

const isStudentEnrolled = async (wantedClass, studentId) => {
    try {
        // Check if the student is enrolled in the given class
        let enrolled =  await db.any('SELECT * FROM students INNER JOIN class_enrollments ON ' +
                                     'students.id=class_enrollments.student_id WHERE class_id=$1 AND ' + 
                                     'student_id=$2',[wantedClass, studentId]);
        
        if(enrolled.length) {
            return true;
        } else {
            return false;
        }

    } catch(err) {
        console.log(err);
    }
    
} // End of isStudentEnrolled() function

const getStudents = async(req, res) => {
    try {
        let {classId} = req.params;

        let students = db.any("SELECT * FROM class_enrollments INNER JOIN students ON class_enrollments.student_id=students.id WHERE class_id=$1", classId);
    
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
    } catch(err) {
        console.log(err)
    }
    
} // End of getStudents() function

const updateStudent = async (req, res) => {
    try {
        let {classId, studentId} = req.params;
        let {grade} = req.body;

        if(await isClassExisting(classId) && await isStudentExisting(studentId)) {
            let students = await db.any("SELECT * FROM class_enrollments WHERE student_id=$1 AND class_id=2", [studentId, classId]);
            
            if(students.length) {
                await db.none("UPDATE class_enrollments SET grade=$1 WHERE class_id=$2 AND student_id=$3", [grade, classId, studentId]);
                let updated = await db.one("SELECT * FROM class_enrollments WHERE student_id=$1 AND class_id=$2", [studentId, classId]);
                res.json({
                    updated,
                    message: "Student grade successfully updated",
                    timestamp: new Date().toString()
                })
            } else {
                res.json({
                    error: "No student found by that ID in that class",
                    timestamp: new Date().toString()
                })
            }
        }
    } catch(err) {
        console.log(err);
    }
    
} // End of updateStudent() function

const enrollStudent = async (req, res) => {
    let {classId, studentId} = req.params;

    // Check if class is existing
    if(await isClassExisting(classId)) {
        let newClass = await db.one("SELECT * FROM classes WHERE id=$1", classId);
        
        // Check if the student is Existing in the school
        if(await isStudentExisting(studentId)) {
            // Check if the student is enrolled in the class
            if(await isStudentEnrolled(classId, studentId)) {
                // If yes then send already enrolled error
                res.json({ 
                    error: "Already enrolled in that class",
                    timestamp: new Date().toString()
                })
            } else {
                // If No then enroll the student in the course
                let student = await db.one('INSERT INTO class_enrollments (class_id, student_id) ' + 
                             'VALUES($1, $2) RETURNING *', [newClass.id, studentId]);
 
                res.json({ 
                    student,
                    className: newClass.class_name,
                    message: "Enrolled Student",
                    timestamp: new Date().toString()
                })
            }
        } else {
            // If the student isn't found
            res.json({
                error: "Student not found by that ID",
                timestamp: new Date().toString()
            });
        }
 
    } else {
        res.json({
            error: `Class doesn't exist.`,
            timestamp: new Date().toString()
        })
    }
} // End of enrollStudent() function

module.exports = {updateStudent, enrollStudent, getStudents};