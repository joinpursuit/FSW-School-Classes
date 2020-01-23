const {db} = require("../../db.js");

const isUsernameExisting = async (username) => {
    try {
        return await db.any("SELECT * FROM logins WHERE username=$1", username);
    } catch (err) {
        console.log(err);
    }
} // End of isUsernameExisting() function

const getUser = async (req, res) => {
    try {
        let {username, password} = req.query;
        let user = db.any("SELECT * FROM logins WHERE username=$1 AND password=$2", [username, password]);
    
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
        let {username, password} = req.query;
        if(isUsernameExisting(username)) {
            res.json({
                error: "User with that name already exists.",
                timestamp: new Date().toString()
            })
        } else {
            await db.none("INSERT INTO logins (username, password) VALUES($1, $2)", [username, password]);
            res.json({
                message: "User successfully created",
                timestamp: new Date().toString()
            })
        }
    } catch(err) {
        console.log(err);
    }
    
} // End of createUser() function

module.exports = {getUser, createUser};