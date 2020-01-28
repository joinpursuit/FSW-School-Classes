document.addEventListener("DOMContentLoaded", () => {
  let addClassForm = document.querySelector("#addClass")
  let addStudentForm = document.querySelector("#addStudent")
  let listStudentsForm = document.querySelector("#listStudents")
  let listStudentsInput = document.querySelector("#listStudentsInput") 
  let classNameInput = document.querySelector("#classNameInput") 
  let teacherNameInput = document.querySelector("#teacherNameInput") 

  addClassForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let inputValue1 = classNameInput.value
    let inputValue2 = teacherNameInput.value
    let url = `http://localhost:3000/class/${inputValue1}/${inputValue2}`
    axios.post(url).then(res => {
        console.log(res)
        debugger
    })
    
    
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

})