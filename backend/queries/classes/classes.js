const {db} = require("./../../db");

const isClassExisting = async (newClass) => {
    try {
        let {teacher} = newClass;
        let classes = await db.any('SELECT * FROM classes WHERE class_name=$1 AND teacher=$2', 
                                   [newClass.name, teacher]);
        
        if(classes.length) {
            return true;
        } else {
            return false
        }
    } catch (err) {
        console.log(err);
    }
    
} // End of isClassExisting() function

const addClass = async (req, res) => {
    try {
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
    } catch(err) {
        console.log(err);
    }
    
} // End of addClass() function

const getClasses = async (req, res) => {
    try {
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
    }catch(err) {
        console.log(err);
    }
    
} // End of getClasses() function

module.exports = {addClass, getClasses};