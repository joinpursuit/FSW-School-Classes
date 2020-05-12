const {db} = require("../../db.js");

// Checks if a user with the given username exists
const isUsernameExisting = async (username) => {
    try {
        let user =  await db.any("SELECT * FROM logins WHERE username=$1", username);
        
        if(user.length) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
} // End of isUsernameExisting() function

// Checks if the user matching that type and ID already has an account
const isUserAccountExisting = async (userType, userId) => {
    try {
        console.log("Is account existing")
        let user;
        if(userType === "admins") {
            user = await db.any('SELECT * FROM logins WHERE admin_id=$1', userId);
        } else if(userType === "teachers") {
            user = await db.any('SELECT * FROM logins WHERE teacher_id=$1', userId);
        } else if(userType === "students") {
            user = await db.any('SELECT * FROM logins WHERE student_id=$1', userId);
        }

        if(user.length) {
            return true;
        } else {
            return false;
        }
    } catch(err) {
        console.log(err);
    }
} // End of isUserAccountExisting() function

// Checks if the user exists by username & password
const getUser = async (req, res) => {
    try {
        let {username, password} = req.query;
        let user = await db.any("SELECT * FROM logins WHERE username=$1 AND passes=$2", [username, password]);

        if(user.length) {
            res.json({
                user,
                message: "Logged in",
                timestamp: new Date().toString()
            })
        } else {
            res.json({
                error: "No user found",
                timestamp: new Date().toString()
            })
        }
    } catch(err) {
        console.log(err);
    }
    
} // End of getUser() function

const createUser = async (req, res) => {
    try {
        let {username, password, userType, userId} = req.query;
        if(await isUsernameExisting(username)) {
            res.json({
                error: "User with that name already exists.",
                timestamp: new Date().toString()
            })
        } else if(await isUserAccountExisting(userType, userId)) {
            res.json({
                error: "That person has an account already",
                timestamp: new Date().toString()
            })
        } else {
            if(userType === "admins") {
                await db.none("INSERT INTO logins (username, passes, admin_id) VALUES($1, $2, $3)", [username, password, userId]);
            } else if(userType === "teachers") {
                await db.none("INSERT INTO logins (username, passes, teacher_id) VALUES($1, $2, $3)", [username, password, userId]);
            } else if(userType === "students") {
                await db.none("INSERT INTO logins (username, passes, student_id) VALUES($1, $2, $3)", [username, password, userId]);
            }

            res.json({
                message: "User successfully created",
                timestamp: new Date().toString()
            })
        }
    } catch(err) {
        console.log(err);
    }
    
} // End of createUser() function

// Checks if the person exists by user type, ID, and name check
const getPerson = async (req, res) => {
    try {
        let {userType, id, firstName, lastName} = req.params;
        let person;
        if(userType === "admins") {
            person = await db.any(`SELECT * FROM admins WHERE id=$1 AND first_name=$2 AND last_name=$3`, [id, firstName, lastName]);
        } else if(userType === "teachers") {
            person = await db.any(`SELECT * FROM teachers WHERE id=$1 AND first_name=$2 AND last_name=$3`, [id, firstName, lastName]);
        } else {
            person = await db.any(`SELECT * FROM students WHERE id=$1 AND first_name=$2 AND last_name=$3`, [id, firstName, lastName]);
        }
       
        if(person.length) {
            if(await isUserAccountExisting(userType, person[0].id)) {
                res.json({
                    error: "That person has an account already", 
                    timestamp: new Date().toString()
                });
            } else {
                res.json({
                    person: person[0],
                    message: "User successfully found",
                    timestamp: new Date().toString()
                })
            }
            
        } else {
            res.json({
                error: "No user found by that set of information",
                timestamp: new Date().toString()
            })
        }

    } catch(err) {
        console.log(err);
    }
} // End of getPerson() function

module.exports = {getUser, createUser, getPerson};