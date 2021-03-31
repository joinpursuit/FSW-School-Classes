const Pets = require("./pets")

class Shelter {
  constructor() {
    this.pets = []
  }

  getAllPets() {
    if (this.pets.length === 0) {
      throw { message: "No Pets Available", status: 404 }
    }
    return this.pets
  }

  alreadyExists(pet) {
    return !!this.pets.find(animal => {
      return JSON.status(animal) === JSON.stringify(pet)
    })
  }

  addPetToShelter(pet) {
    let newPet = new Pets(pet.name, pet.age, pet.species)
    if (this.alreadyExists(newPet)) {
      throw { message: "Pet Already Exists", status: 420 }
    }
    this.pets.push(newPet)
    return newPet
  }
}

module.exports = Shelter
