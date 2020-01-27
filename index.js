document.addEventListener("DOMContentLoaded", () => {
  let newClassDiv = document.querySelector("#newClassDiv")
  let newClassForm = document.querySelector("#newClassForm")
  let newStudentDiv = document.querySelector("#addNewStudent")
  let newStudentForm = document.querySelector("#newStudentForm")

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

  newStudentForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let className = document.querySelector("#class").value
    let name = document.querySelector("#name").value
    let age = document.querySelector("#age").value
    let grade = document.querySelector("#grade").value
    let city = document.querySelector("#city").value

    let res = await axios.post("http://localhost:3000/classes/enroll",{class: className, name, age, grade, city})
    let p = document.createElement("p")
    console.log(res.data)
    p.innerText = res.data.message
    newStudentDiv.appendChild(p)

  })

})