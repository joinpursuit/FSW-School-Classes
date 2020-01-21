const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")({});
const connectionString = "postgres://localhost:5432/my_school_database";
const db = pgp(connectionString);

const School = require("./classes/School.js");

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

let mySchool = new School();

const isClassExisting = async (newClass) => {
    let classes;
    if(typeof newClass === "string") {
        classes = await db.any(`SELECT * FROM classes WHERE class_name=$1`, newClass);
    } else {
        classes = await db.any('SELECT * FROM classes WHERE class_name=${name} ' +
                               'AND teacher=${teacher}', newClass);
    }
    
    if(classes.length) {
        return true;
    } else {
        return false
    }
}

const isStudentExisting = async (firstName, lastName) => {
    let students =  await db.any('SELECT * FROM students WHERE first_name=$1 AND last_name=$2', [firstName, lastName]);

    if(students.length) {
        return true;
    } else {
        return false;
    }
}

const isStudentEnrolled = async (student, wantedClass) => {
    try {
        let addedStudent = await db.any('SELECT * FROM students WHERE first_name=${firstName} AND last_name=${lastName}', student);
        let enrolled =  await db.any('SELECT * FROM students INNER JOIN class_enrollments ON students.id=class_enrollments.student_id WHERE class_id=$1 AND student_id=$2',[wantedClass.id, addedStudent.id]);
        
        if(enrolled.length) {
            return true;
        } else {
            return false;
        }

    } catch(err) {
        console.log(err);
    }
    
}

const findClass = async (className) => {
    return await db.one('SELECT * FROM classes WHERE class_name=$1', className);
}

const getStudentsByClass = async (className) => {
    let {id} = await db.one('SELECT id FROM classes WHERE class_name=$1', className);
    if(id) {
        return await db.any('SELECT * FROM students INNER JOIN class_enrollments ON students.id=class_enrollments.student_id WHERE class_id=$1', id);
    } else {
        return false;
    }
}

const getStudentsByClassWithFilter = async(className, failing, city) => {
    let {id} = await db.one('SELECT id FROM classes WHERE class_name=$1', className);
    if(id) {
        if(failing && city) {
            return await db.any('SELECT * FROM students INNER JOIN class_enrollments ON students.id=class_enrollments.student_id WHERE class_id=$1 AND grade<70 AND city=$2', [id, city]);
        } else if(failing) {
            return await db.any('SELECT * FROM students INNER JOIN class_enrollments ON students.id=class_enrollments.student_id WHERE class_id=$1 AND grade<70', id);
        } else if(city) {
            return await db.any('SELECT * FROM students INNER JOIN class_enrollments ON students.id=class_enrollments.student_id WHERE class_id=$1 AND city=$2', [id, city]);
        }
    } else {
        return false;
    }
}

app.post("/class", async (req, res) => {
    // addClass returns false if the information is incorrect/class exists
    // Checking if addClass returns false, if it does an error is sent
    let newClass = req.body;

    if(await isClassExisting(newClass)) {
        res.status (400).json({
            error: "Class already exists",
            "timestamp": new Date()
        })
    } else {
        db.none('INSERT INTO classes(class_name, teacher) VALUES(${name}, ${teacher})', newClass).then(() => {
            res.status (200).json({
                class: req.body,
                message: "created a new class",
                timestamp: new Date().toString()
            })
        })
    }
})

app.post("/class/:className/enroll", async (req, res) => {
    let className = req.params.className;
    req.body.name = req.body.firstName + " " + req.body.lastName;
    let student = req.body;

    if(await isClassExisting(className)) {
       let newClass = await findClass(className);
       
       if(await isStudentEnrolled(student, newClass)) {
            let existingStd = await db.one('SELECT id FROM students WHERE first_name=${firstName} AND last_name=${lastName}', student);
            db.none('UPDATE class_enrollments SET grade=$1 WHERE student_id=$2', [student.grade, existingStd.id]);

            res.json({ 
                student: req.body,
                className: className,
                message: "Updated Student",
                timestamp: new Date().toString()
            })
       } else if(await isStudentExisting(student.firstName, student.lastName)) {
            let existingStd = await db.one('SELECT id FROM students WHERE first_name=$firstName AND last_name=$lastName', student);
            db.none('INSERT INTO class_enrollments (class_id, student_id) VALUES($1, $2)', [newClass.id, existingStd.id])
       } else {
            let addedStudent = await db.one('INSERT INTO students (first_name, last_name, city, age) VALUES(${firstName}, ${lastName}, ${city}, ${age}) RETURNING *', student);
            db.none('INSERT INTO class_enrollments (class_id, student_id, grade) VALUES($1, $2, $3)', [newClass.id, addedStudent.id, student.grade])
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

    // enrollStudent returns false if student information is incorrect
    // Checking if false is returned, if it is then an error is sent

    
})

app.get("/class/:className/students", async (req, res) => {
    let className = req.params.className;
    let {city, failing} = req.query;
    
    if(await isClassExisting(className)) {
        let students;
        if(city || failing) {
            students = await getStudentsByClassWithFilter(className, failing, city);
        } else {
            students = await getStudentsByClass(className);
        }

        res.json({
            // If city or failing queries are passed, then WithFilter version of getStudentsByClass runs
            // Otherwise the normal version runs
            students: students,
            message: "Retrieved students",
            timestamp: new Date().toString()
        }) 
    } else {
        res.json({
            error: `Class ${className} doesn't exist.`,
            timestamp: new Date().toString()
        })
    }
})

app.listen(port, () => console.log("Listening on port", port));