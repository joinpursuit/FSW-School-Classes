document.addEventListener("DOMContentLoaded", () => {
  let newClassDiv = document.querySelector("#newClassDiv")
  let newClassForm = document.querySelector("#newClassForm")

  newClassForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let teacherName = document.querySelector("#teacherName").value
    let newClassName = document.querySelector("#newClassName").value
    let res = await axios.post(`http://localhost:3000/classes/add`, {teacher: teacherName, class: newClassName})
    let p = document.createElement("p")
    console.log(res.data)
    p.innerText = res.data.message
    newClassDiv.appendChild(p)
    newClassForm.reset()  
  })

})