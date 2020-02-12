  const School = require("../School")

  let addClassForm = document.querySelector("#addClass")
  let addStudentForm = document.querySelector("#addStudent")
  let listStudentsForm = document.querySelector("#listStudents")
  let listStudentsInput = document.querySelector("#listStudentsInput") 
  
  addClassForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let classNameInput = document.querySelector("#classNameInput") 
    let teacherNameInput = document.querySelector("#teacherNameInput") 
    
    await axios.post("http://localhost:3000/class/", School.addClass(classNameInput.value, teacherNameInput.value))  
  })

 addStudentForm.addEventListener("submit", (e) => {
    e.preventDefault()
  })

  listStudentsForm.addEventListener("submit", async(e) => {
    e.preventDefault()
    let inputValue = listStudentsInput.value
    let url = `http://localhost:3000/class/${inputValue}/students`
   await axios.get(url).then(res => {
        console.log(res)
       debugger
        let li = document.createElement("li")
        li.innerHTML = ""
    })
    // debugger
})