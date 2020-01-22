const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")({});
const connectionString = "postgres://localhost:5432/my_school_database";
const db = pgp(connectionString);

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

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

const isStudentExisting = async (firstName, lastName) => {
    try {
        // Finding any students that match the given name and last name
        let students =  await db.any('SELECT * FROM students ' + 
                                     'WHERE first_name=$1 AND last_name=$2', [firstName, lastName]);

        if(students.length) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
    
} // End of isStudentExisting() function

const isStudentEnrolled = async (student, wantedClass) => {
    try {
        // Find the existing student
        let addedStudent = await db.any('SELECT * FROM students WHERE first_name=${firstName} AND ' +
                                        'last_name=${lastName}', student);

        // Check if the student is enrolled in the given class
        let enrolled =  await db.any('SELECT * FROM students INNER JOIN class_enrollments ON ' +
                                     'students.id=class_enrollments.student_id WHERE class_id=$1 AND ' + 
                                     'student_id=$2',[wantedClass.id, addedStudent.id]);
        
        if(enrolled.length) {
            return true;
        } else {
            return false;
        }

    } catch(err) {
        console.log(err);
    }
    
} // End of isStudentEnrolled() function

const findClass = async (className) => {
    try {
        // Find the class matching the given name
        return await db.one('SELECT * FROM classes WHERE class_name=$1', className);
    } catch (err) {
        console.log(err);
    }
    
} // End of findClass() function

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

app.post("/class", async (req, res) => {
    let newClass = req.body;

    // Check ig the class is already existing
    if(await isClassExisting(newClass)) {
        res.status (400).json({
            error: "Class already exists",
            "timestamp": new Date()
        });

    } else {
        // Add the new class to the DB
        db.none('INSERT INTO classes(class_name, teacher) ' + 
                'VALUES(${name}, ${teacher})', newClass);

        res.status (200).json({
            class: req.body,
            message: "created a new class",
            timestamp: new Date().toString()
        })
    }
}) // End of /class route

app.post("/class/:className/enroll", async (req, res) => {
    let className = req.params.className;
    req.body.name = req.body.firstName + " " + req.body.lastName;
    let student = req.body;

    // Check if class is existing
    if(await isClassExisting(className)) {
       let newClass = await findClass(className);
       
       // Check if the student is Existing in the school
       if(await isStudentExisting(student.firstName, student.lastName)) {
           // If Yes then enroll the student in only the course
            let existingStd = await db.one('SELECT id FROM students WHERE first_name=$firstName AND ' + 
                                           'last_name=$lastName', student);

            db.none('INSERT INTO class_enrollments (class_id, student_id) ' + 
                    'VALUES($1, $2)', [newClass.id, existingStd.id]);

        // Check if the student is enrolled in the class
       } else if(await isStudentEnrolled(student, newClass)) {
           // If yes then update the students info in the class (grade)

            let existingStd = await db.one('SELECT id FROM students WHERE first_name=${firstName} AND ' + 
                                           'last_name=${lastName}', student);

            db.none('UPDATE class_enrollments SET grade=$1 ' + 
                    'WHERE student_id=$2', [student.grade, existingStd.id]);

            res.json({ 
                student: req.body,
                className: className,
                message: "Updated Student",
                timestamp: new Date().toString()
            })

       } else {
           // If the student isn't existing then enroll in both the school AND the class

            let added = await db.one('INSERT INTO students (first_name, last_name, city, age) ' + 
                                     'VALUES(${firstName}, ${lastName}, ${city}, ${age}) RETURNING *', student);

            db.none('INSERT INTO class_enrollments (class_id, student_id, grade) ' + 
                    'VALUES($1, $2, $3)', [newClass.id, added.id, student.grade])
       }

        res.json({ 
            student: req.body,
            className: className,
            message: "Enrolled Student",
            timestamp: new Date().toString()
        })

    } else {
        res.json({
            error: `Class ${className} doesn't exist.`,
            timestamp: new Date().toString()
        })
    }
}) // End of /class/:className/enroll route

app.get("/class/:className/students", async (req, res) => {
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

        res.json({
            // If city or failing queries are passed, then WithFilter version of getStudentsByClass runs
            // Otherwise the normal version runs
            students: students,
            className: className,
            message: "Retrieved students",
            timestamp: new Date().toString()
        }) 

    } else {
        res.json({
            error: `Class ${className} doesn't exist.`,
            timestamp: new Date().toString()
        })
    }
}) // End of /class/:className/students route

app.get("/student/:id", async (req, res) => {
    let {id} = req.params;
    let student = await findStudentById(id);
    let studentClasses = await findStudentClasses(id);
    if(student) {
        res.json({
            student: student,
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
})

app.get("/student/:firstName/:lastName", async (req, res) => {
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
                student: student,
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
    
})

app.patch("/student/:id", async (req, res) => {
    let {firstName, lastName, age, city} = req.query;
    let {id} = req.params;
    if(firstName) {
        let updatedStudent = await db.one('UPDATE students SET first_name=$1 WHERE id=$2 RETURNING *', [firstName, id]);
        res.json({
            updated: updatedStudent,
            message: "Updated first name",
            timestamp: new Date().toString()
        })
    } else if(lastName) {
        let updatedStudent = await db.one('UPDATE students SET last_name=$1 WHERE id=$2 RETURNING *', [lastName, id]);
        res.json({
            updated: updatedStudent,
            message: "Updated last name",
            timestamp: new Date().toString()
        })
    } else if(age) {
        let updatedStudent = await db.one('UPDATE students SET age=$1 WHERE id=$2 RETURNING *', [age, id]);
        res.json({
            updated: updatedStudent,
            message: "Updated age",
            timestamp: new Date().toString()
        })
    } else if(city) {
        let updatedStudent = await db.one('UPDATE students SET city=$1 WHERE id=$2 RETURNING *', [city, id]);
        res.json({
            updated: updatedStudent,
            message: "Updated city",
            timestamp: new Date().toString()
        })
    }
})

app.listen(port, () => console.log("Listening on port", port));