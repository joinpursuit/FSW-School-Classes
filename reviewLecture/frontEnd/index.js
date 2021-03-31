document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form")

  form.addEventListener("submit", async e => {
    e.preventDefault()
    let name = document.querySelector("#name")
    let age = document.querySelector("#age")
    let species = document.querySelector("#species")
    let h3 = document.querySelector("#h3")
    try {
      let res = await axios.post("http:localhost:3000/pets", {
        name: name.value,
        age: age.value,
        species: species.value
      })
      ;(name = ""), (age = ""), (species = "")
      h3.innerText = res.data.message
    } catch (error) {
      h3.innerText = error.response.data.message
      debugger
    }
  })
})

form.addEventListener("input", () => {
  let h3 = document.querySelector("h3")
  h3.innerText = ""
})

let button = document.querySelector("#showPets")
button.addEventListener("click", async () => {
  let ul = document.querySelector("ul")
  ul.innerHTML = ""
  try {
    let res = await axios.get("http://localhost:3000/pets")
    res.data.pets.forEach(pet => {
      let li = document.createElement("li")
      li.innerText = pet.name
      ul.appendChild(li)
    })
  } catch (error) {
    debugger
    ul.innerText = err.response.data.message
  }
})
