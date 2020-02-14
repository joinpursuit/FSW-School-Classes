document.addEventListener("DOMContentLoaded", () => {
  let newClassDiv = document.querySelector("#newClassDiv")
  let newClassForm = document.querySelector("#newClassForm")
  let newStudentDiv = document.querySelector("#addNewStudent")
  let newStudentForm = document.querySelector("#newStudentForm")
  let classSelect = document.querySelector("#classSelect")
  let displayStudents = document.querySelector("#displayStudents")
  let getStudentsForm = document.querySelector("#getStudentsForm")

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

  getStudentsForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    displayStudents.innerHTML = ""
    let className = classSelect.value
    let failing = document.querySelector("#failing").checked
    let studentCity = document.querySelector("#studentCity").value
    if (failing && studentCity){
      let res = await axios.get(`http://localhost:3000/class/${className}/students/?failing=${failing}&city=${studentCity}`)
      let students = res.data.payload
      students.forEach((student) => {
        let {name, city, age, grade} = student
        let p = document.createElement("p")
        p.innerText = `Name: ${name} | City: ${city} | Age: ${age} | Grade: ${grade}`
        displayStudents.appendChild(p)
      })
    } else if (studentCity){
      console.log(studentCity)
      let res = await axios.get(`http://localhost:3000/class/${className}/students/?city=${studentCity}`)
      let students = res.data.payload
      students.forEach((student) => {
        let {name, city, age, grade} = student
        let p = document.createElement("p")
        p.innerText = `Name: ${name} | City: ${city} | Age: ${age} | Grade: ${grade}`
        displayStudents.appendChild(p)
      })
    } else if (failing){
      let res = await axios.get(`http://localhost:3000/class/${className}/students/?failing=${failing}`)
      let students = res.data.payload
      students.forEach((student) => {
        let {name, city, age, grade} = student
        let p = document.createElement("p")
        p.innerText = `Name: ${name} | City: ${city} | Age: ${age} | Grade: ${grade}`
        displayStudents.appendChild(p)
      })
    } else {
      let res = await axios.get(`http://localhost:3000/class/${className}/students/`)
      let students = res.data.payload
      students.forEach((student) => {
        let {name, city, age, grade} = student
        let p = document.createElement("p")
        p.innerText = `Name: ${name} | City: ${city} | Age: ${age} | Grade: ${grade}`
        displayStudents.appendChild(p)
      })
    }
    
  })

  fillClassSelection()
  })