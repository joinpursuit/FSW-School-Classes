document.addEventListener("DOMContentLoaded", () => {
  let newClassDiv = document.querySelector("#newClassDiv")
  let newClassForm = document.querySelector("#newClassForm")
  let newStudentDiv = document.querySelector("#addNewStudent")
  let newStudentForm = document.querySelector("#newStudentForm")
  let classSelect = document.querySelector("#classSelect")

  const fillClassSelection = async () => {
    let res = await axios.get("http://localhost:3000/class")
    let classes = Object.keys(res.data.payload)
    classes.forEach((el) => {
      let option = document.createElement("option")
      option.innerText = el
      option.value = el.replace(" ", "%20")
      classSelect.appendChild(option)
    })
  }

  newClassForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let teacherName = document.querySelector("#teacherName").value
    let newClassName = document.querySelector("#newClassName").value
    let res = await axios.post(`http://localhost:3000/class`, {teacher: teacherName, className: newClassName})
    let p = document.createElement("p")
    p.innerText = res.data.message
    newClassDiv.appendChild(p)
    newClassForm.reset()  
  })

  newStudentForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let className = document.querySelector("#class").value
    className.replace(" ", "%20")
    let name = document.querySelector("#name").value
    let age = document.querySelector("#age").value
    let grade = document.querySelector("#grade").value
    let city = document.querySelector("#city").value
    let res = await axios.post(`http://localhost:3000/class/${className}/enroll`,{name, age, grade, city})
    let p = document.createElement("p")
    p.innerText = res.data.message
    newStudentDiv.appendChild(p)

  })

})