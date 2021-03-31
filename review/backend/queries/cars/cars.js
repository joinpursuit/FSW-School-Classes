const db = require("../../db/index");
                                                                                                                                                       
const getAllCars = async (req, res, next) => {
    try {
        const cars = await db.any("SELECT * FROM cars");
        res.json({
            status: "success",
            message: "all cars",
            payload: cars
        })
    } catch (err) {
        //next(err);
        res.json({
            status: "error",
            payload: null,
            message: "error thrown"
        })
    }
}


const createCar = async (req, res, next) => {
    await db.none('INSERT INTO cars (brand, year) VALUES(${brand}, ${year})', req.body)
    res.json({
        status: "success",
        message: "new car added"
    })
}

module.exports = { getAllCars, createCar }                                