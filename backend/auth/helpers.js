const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12)
        const password_digest = await bcrypt.hash(password, salt)

        return password_digest
    } catch (err) {
        console.log(err);
    }
}


const comparePasswords = async (candidatePassword, passwordDigest) => {
    try {
        return await bcrypt.compare(candidatePassword, passwordDigest)

    } catch (err) {
        console.log('eros', err);

    }
}

const loginRequired = (req, res, next) => {
    if (req.user) return next()

    res.status(401).json({
        payload: null,
        msg: 'You need to be logged in to access this route',
        err: true
    })
}


module.exports = {
    hashPassword,
    comparePasswords,
    loginRequired

}