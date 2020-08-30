const db = require('../db')


const getAllUsers = async () => {
    let allUsers = `SELECT 
                    id,username,avatar_url 
                    FROM 
                    users
                    ORDER BY username ASC
                    `

    return await db.any(allUsers)
}

const getUsersById = async (id) => {
    return await db.oneOrNone("SELECT id,username,avatar_url from users WHERE id = $1", [id])
}

const addNewUser = async (userObj) => {

    if (userObj.avatar_url === '') {
        userObj.avatar_url = `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVNvzwx7wJwD8DQM_nzGcl3hyBLEevUfKLOU3bv5X90J7_QExP`
    }

    const newUserQStr = `INSERT INTO users (username, avatar_url,password_digest,id) 
VALUES($/username/,$/avatar_url/,$/password_digest/,$/id/) RETURNING id,username,avatar_url`

    return await db.one(newUserQStr, {
        username: userObj.username,
        avatar_url: userObj.avatar_url,
        password_digest: userObj.password,
        id:userObj.user_id
    })
}

const getUserByUsername = async (username) => {
    let user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username])
    return user
}

const updateUserInfo = async (userObj, id) => {

    if (userObj.username) {
        return await db.oneOrNone(`UPDATE users 
                            SET username = $1 
                            WHERE id = $2
                            RETURNING  id,username,avatar_url`, [userObj.username, Number(id)])

    } else if (userObj.avatar_url) {
        return await db.oneOrNone(`UPDATE users 
                            SET avatar_url = $1
                            WHERE id = $2
                            RETURNING id,username,avatar_url`, [userObj.avatar_url, Number(id)])

    }
}

module.exports = {
    getAllUsers,
    getUsersById,
    addNewUser,
    getUserByUsername,
    updateUserInfo
}