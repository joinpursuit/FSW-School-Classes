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

addClassInfoBtn.addEventListener("click", e => {
  e.preventDefault()
  formAddClass.innerHtml = ""
  axios.post(`http://localhost:3001/class/add`).then(res => {
    // debugger
    formAddClass.classList.add("hidden")
    res.data.class.teacher = teacherInput.value
    res.data.class.name = classInput.value

    let p = document.createElement("p")
    p.innerText = `Teacher : ${res.data.class.teacher}, Class: ${res.data.class.name}`
    formDiv.appendChild(p)

  })


})




getStudentInfoBtn.addEventListener("click", e => {
  e.preventDefault()
  div.innerHTML = ""
  axios
    .get(`http://localhost:3001/class/${studentByClassInput.value}/students`)
    .then(res => {
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
  // } else {
  axios.get(`http://localhost:3001/class/${studentByCityInput.value}/students`).then(res => {
    // console.log(res)
      // debugger
    res.data.forEach(el => {
      let ul = document.createElement("ul")
      let li = document.createElement("li")
      li.innerText = el.city
      ul.appendChild(li)
      div.appendChild(ul)

    })

  })

  
})
