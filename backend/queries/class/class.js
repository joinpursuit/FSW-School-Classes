const {db} = require("./../../db.js");

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

    // Check ig the class is already existing
    if(await isClassExisting(newClass)) {
        res.json({
            error: "Class already exists",
            "timestamp": new Date()
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

module.exports = {addClass, findStudents}