const {db} = require("./../../db.js");

const isClassExisting = async (newClass) => {
    try {
        let classes;

        // If just a class name is entered (as opposed to an object) then the first is ran
        // Then it finds a class matching the given class name
        if(typeof newClass === "string") {
            classes = await db.any(`SELECT * FROM classes WHERE class_name=$1`, newClass);
        } else {
            let {teacher} = newClass;
            classes = await db.any('SELECT * FROM classes WHERE class_name=$1 AND teacher=$2', [newClass.name, teacher]);
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

const isClassIdExisting = async (classId) => {
    try {
        let found = await db.any("SELECT * FROM class_enrollments WHERE class_id=$1", classId);

        if(found.length) {
            return true;
        } else {
            return false;
        }
    } catch(err) {
        console.log(err);
    }
} // End of isClassIdExisting() function

const isStudentExisting = async (studentId) => {
    try {
        let found = await db.any("SLECT * FROM class_enrollments WHERE student_id$1", studentId);

        if(found.length) {
            return true;
        } else {
            return false;
        }
    } catch(err) {
        console.log(err);
    }
} // End of isStudentExisting() function

const getStudentsByClass = async (className) => {
    try {
        // Grabbing the needed class ID from the given class 
        let {id} = await db.one('SELECT id FROM classes WHERE class_name=$1', className);

        // If the class exists, and an ID is returned then find the students from that class
        if(id) {
            return await db.any('SELECT * FROM students INNER JOIN class_enrollments ON ' + 
                                'students.id=class_enrollments.student_id WHERE class_id=$1', id);
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
   
} // End of getStudentsByClass() function

const getStudentsByClassId = async (id) => {
    try {
        return await db.any('SELECT * FROM class_enrollments INNER JOIN students ON class_enrollments.student_id=students.id WHERE class_id=$1', id);
    } catch(err) {
        console.log(err);
    }
} // End of getStudentsByClassId() function

const getStudentsByClassWithFilter = async (className, failing, city) => {
    try {
        // Grabbing the needed ID from the given class
        let {id} = await db.one('SELECT id FROM classes WHERE class_name=$1', className);

        // If the class exists, and an ID is returned then find the students from that class (off filters)
        if(id) {
            if(failing && city) {
                // Find the students from the given city that are failing
                return await db.any('SELECT * FROM students INNER JOIN class_enrollments ON ' + 
                                    'students.id=class_enrollments.student_id WHERE class_id=$1 ' + 
                                    'AND grade<70 AND city=$2', [id, city]);
            } else if(failing) {
                // Find the students that are failing
                return await db.any('SELECT * FROM students INNER JOIN class_enrollments ON ' + 
                                    'students.id=class_enrollments.student_id WHERE class_id=$1 ' + 
                                    'AND grade<70', id);
            } else if(city) {
                // Find the students from the given city
                return await db.any('SELECT * FROM students INNER JOIN class_enrollments ON ' + 
                                    'students.id=class_enrollments.student_id WHERE class_id=$1 ' + 
                                    'AND city=$2', [id, city]);
            }
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
    
} // End of getStudentByClassWithFilter() function

const addClass = async (req, res) => {
    let newClass = req.body;

    // Check if the class is already existing
    if(await isClassExisting(newClass)) {
        res.json({
            error: "Class already exists",
            "timestamp": new Date().toString()
        });

    } else {
        // Add the new class to the DB
        db.none('INSERT INTO classes(class_name, teacher) ' + 
                'VALUES(${name}, ${teacher})', newClass);

        res.status(200).json({
            class: req.body,
            message: "created a new class",
            timestamp: new Date().toString()
        })
    }
} // End of addClass() function

const findStudents = async (req, res) => {
    let className = req.params.className;
    let {city, failing} = req.query;
    
    // If class is existing then find the students
    if(await isClassExisting(className)) {
        let students;

        // Check if either filters are passed
        if(city || failing) {
            // Get the students by the entered filter
            students = await getStudentsByClassWithFilter(className, failing, city);
        } else {
            // Get all students
            students = await getStudentsByClass(className);
        }

        res.status(200).json({
            // If city or failing queries are passed, then WithFilter version of getStudentsByClass runs
            // Otherwise the normal version runs
            students,
            className,
            message: "Retrieved students",
            timestamp: new Date().toString()
        }) 

    } else {
        res.json({
            error: `Class ${className} doesn't exist.`,
            timestamp: new Date().toString()
        })
    }
} // End of findStudents() function

const getAllClasses = async (req, res) => {
    let classes = await db.any("SELECT * FROM classes INNER JOIN teachers ON classes.teacher=teachers.id");

    if(classes.length) {
        res.json({
            classes,
            message: "Classes retrieved",
            timestamp: new Date().toString()
        })
    } else {
        res.json({
            error: "No classes found",
            timestamp: new Date().toString()
        })
    }
} // End of getAllClasses() function

const updateStudent = async (req, res) => {
    let {classId, studentId} = req.params;
    let {grade} = req.body;
    console.log(grade);
    if(await isClassIdExisting(classId) && await isStudentExisting(studentId)) {
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
} // End of updateStudent() function

const findStudentsByClassId = async (req, res) => {
    try {
        let students = await getStudentsByClassId(req.params.classId);
    } catch(err) {
        console.log(err);
    }
}

const getClassByTeacher = async (req, res) => {
    let {teacherId} = req.params;
    console.log(teacherId);
    let classes = await db.any('SELECT * FROM classes WHERE teacher=$1', teacherId);

    if(classes.length) {
        res.json({
            classes,
            message: "Classes successfully found",
            timestamp: new Date().toString()
        })
    } else {
        res.json({
            error: "No classes found by that teacher",
            timestamp: new Date().toString()
        })
    }
} // End of getClassByTeacher

module.exports = {addClass, findStudents, getAllClasses, updateStudent, getClassByTeacher}