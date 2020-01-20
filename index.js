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

getStudentInfoBtn.addEventListener("click", e => {
    e.preventDefault()
    div.innerHTML = ""
    axios.get(`http://localhost:3001/class/${studentByClassInput.value}/students`)
        .then(res => {
            console.log(res)
    res.data.forEach(el => {
      let ul = document.createElement("ul")
      let li = document.createElement("li")
      li.innerText = el.name
      ul.appendChild(li)
      div.appendChild(ul)
        div.appendChild(ul)
    })
   
  })
})
