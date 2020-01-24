const {db} = require("../../db.js");

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
        let {username, password, userType} = req.query;
        if(await isUsernameExisting(username)) {
            res.json({
                error: "User with that name already exists.",
                timestamp: new Date().toString()
            })
        } else {
            await db.none("INSERT INTO logins (username, passes, account_type) VALUES($1, $2, $3)", [username, password, userType]);
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
            res.json({
                person: person[0],
                message: "User successfully found",
                timestamp: new Date().toString()
            })
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