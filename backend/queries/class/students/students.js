const {db} = require("./../../../db");

const isClassExisting = async (newClass) => {
    try {
        let classes;

        // If just a class name is entered (as opposed to an object) then the first is ran
        // Then it finds a class matching the given class name
        if(typeof newClass === "string") {
            classes = await db.any(`SELECT * FROM classes WHERE class_name=$1`, newClass);
        } else {
            classes = await db.any('SELECT * FROM classes WHERE class_name=${name}', newClass);
        }
        
        if(classes.length) {
            return true;
        } else {
            return false
        }
    } catch (err) {
        console.log(err);
    }
    
} // End of isClassExisting() function

const isStudentExisting = async (id) => {
    try {
        // Finding any students that match the given id
        let student = await db.any('SELECT * FROM students WHERE id=$1', id);

        if(student.length) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
    
} // End of isStudentExisting() function

const isStudentEnrolled = async (studentId, wantedClass) => {
    try {
        // Check if the student is enrolled in the given class
        let enrolled =  await db.any('SELECT * FROM students INNER JOIN class_enrollments ON ' +
                                     'students.id=class_enrollments.student_id WHERE class_id=$1 AND ' + 
                                     'student_id=$2',[wantedClass.id, studentId]);
        
        if(enrolled.length) {
            return true;
        } else {
            return false;
        }

    } catch(err) {
        console.log(err);
    }
    
} // End of isStudentEnrolled() function

const getClass = async (className) => {
    try {
        // Find the class matching the given name
        return await db.one('SELECT * FROM classes WHERE class_name=$1', className);
    } catch (err) {
        console.log(err);
    }
    
} // End of getClass() function

const getStudent = async (id) => {
    try {
        return await db.one("SELECT * FROM students WHERE id=$1", id);
    } catch(err) {
        console.log(err);
    }
} // End of getStudent() function

const enrollStudent = async (req, res) => {
    let {className, studentId, grade} = req.params;

    // Check if class is existing
    if(await isClassExisting(className)) {
       let newClass = await getClass(className);
       
       // Check if the student is Existing in the school
        if(await isStudentExisting(studentId)) {
           // Check if the student is enrolled in the class
            if(await isStudentEnrolled(studentId, newClass)) {
                // If yes then update the students info in the class (grade)
 
                db.none('UPDATE class_enrollments SET grade=$1 WHERE student_id=$2', [grade, studentId]);
    
                res.status(200).json({ 
                    student: await getStudent(studentId),
                    className,
                    grade,
                    message: "Updated Student",
                    timestamp: new Date().toString()
                })
            } else {
                // If No then enroll the student in the course
                db.none('INSERT INTO class_enrollments (class_id, student_id, grade) ' + 
                'VALUES($1, $2, $3)', [newClass.id, studentId, grade]);

                res.status(200).json({ 
                    student: await getStudent(studentId),
                    className,
                    message: "Enrolled Student",
                    grade,
                    timestamp: new Date().toString()
                })
            }
        } else {
            // If the student isn't found
            res.json({error: "Student not found by that ID"});
        }

    } else {
        res.json({
            error: `Class ${className} doesn't exist.`,
            timestamp: new Date().toString()
        })
    }
} // End of enrollStudent() function

module.exports = {enrollStudent};