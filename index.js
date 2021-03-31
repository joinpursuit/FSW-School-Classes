// console.log("hello")

let formDiv = document.querySelector("#formDiv")

let formAddClass = document.querySelector("#formAddClass")
let teacherInput = document.querySelector("#teacherInput")
let classInput = document.querySelector("#classInput")
let addClassInfoBtn = document.querySelector("#addClassInfo")

let formAddStudent = document.querySelector("#formAddStudent")
let studentClassInput = document.querySelector("#studentClassInput")
let studentNameInput = document.querySelector("#studentNameInput")
let studentAgeInput = document.querySelector("#studentAgeInput")
let studentCityInput = document.querySelector("#studentCityInput")
let studentGradeInput = document.querySelector("#studentGradeInput")
let addStudentInfoBtn = document.querySelector("#addStudentInfo")

let formListStudents = document.querySelector("#listStudents")
let studentByClassInput = document.querySelector("#studentByClassInput")
let studentByCityInput = document.querySelector("#studentByCityInput")
let getStudentInfoBtn = document.querySelector("#getStudentInfo")

let div = document.querySelector("#students")
let classes = []

let addClassDiv = document.querySelector("#addClassDiv")
addClassInfoBtn.addEventListener("click", async e => {
  e.preventDefault()
  formAddClass.innerHtml = ""
  try {
    let res = await axios.post(`http://localhost:3001/class/add`, {
      teacher: teacherInput.value,
      class: classInput.value
    })
    // console.log(res)
    // debugger
    formAddClass.classList.add("hidden")
    res.data.class.teacher = teacherInput.value
    res.data.class.name = classInput.value

    let p = document.createElement("p")
    p.innerText = `Teacher : ${res.data.class.teacher}, Class: ${res.data.class.name}`
    addClassDiv.appendChild(p)
  } catch (err) {
    console.log(err)
  }
  //try catch async await
})

getStudentInfoBtn.addEventListener("click", e => {
  e.preventDefault()
  div.innerHTML = ""
  axios
    .get(`http://localhost:3001/class/${studentByClassInput.value}/students`)
    .then(res => {
      console.log(res)
      formListStudents.classList.add("hidden")
      res.data.forEach(el => {
        let ul = document.createElement("ul")
        let li = document.createElement("li")
        li.classList.add("studentListLi")
        li.innerText = el.name
        ul.appendChild(li)
        div.appendChild(ul)
      })
    })
  axios
    .get(`http://localhost:3001/${studentByCityInput.value}/students`)
    .then(res => {
      console.log(res)
      debugger
      res.data.forEach(el => {
        console.log(res)
        let ul = document.createElement("ul")
        let li = document.createElement("li")
        li.innerText = el.city
        ul.appendChild(li)
        div.appendChild(ul)
      })
    })
})

addStudentInfoBtn.addEventListener("click", async e => {
  e.preventDefault()
  formAddStudent.innerHTML = ""
  try {
    let res = await axios.post(
      `http://localhost:3001/class/${studentClassInput.value}/enroll`,
      {
        name: studentNameInput.value,
        age: studentAgeInput.value,
        city: studentCityInput.value,
        grade: studentGradeInput.value
      }
    )
    // debugger

    // console.log(subject)
    res.data = arr
    console.log(res)
    // formListStudents.classList.add("hidden")
    arr.forEach(el => {
      let ul = document.createElement("ul")
      let li = document.createElement("li")
      let p = document.createElement("p")
      li.classList.add("studentListLi")
      p.innerText = `New Student Added:`
      li.innerText = `Name: ${el.name} Age: ${el.age} City: ${el.city} Grade: ${el.grade}`
      formAddStudent.appendChild(p)
      formAddStudent.appendChild(ul)
      ul.appendChild(li)

      // console.log(res)
      // formAddStudent.classList.add("hidden")
      res.data.class = studentClassInput.value
      res.data.class.name = studentNameInput.value
    })
  } catch (err) {
    console.log(err)
  }
})
