const {db} = require("./../../../db");

const getClasses = async (req, res) => {
    try {
        let {teacherId} = req.params;
        let classes = await db.any("SELECT * FROM classes INNER JOIN teachers ON classes.teacher=teachers.id " +
                                   "WHERE teachers.id=$1", teacherId);
    
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
    } catch(err) {
        console.log(err);
    }
    
} // End of getStudents() function

module.exports = {getClasses};