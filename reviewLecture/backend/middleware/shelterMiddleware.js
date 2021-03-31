const shelter = require("../database/db")

const getAllPets = (req, res, next) => {
  try {
    let pets = shelter.getAllPets()
    res.json({
      status: "success",
      message: "All Pets",
      pets
    })
  } catch (error) {
    next(error)
  }
}

const addPetToShelter = (req, res, next) => {
  try {
    let newPet = shelter.addPetToShelter(req.body)
    res.json({
      status: "success",
      message: `New Pet ${newPet.name} was added`,
      pet: newPet
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllPets, addPetToShelter }
