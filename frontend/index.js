document.addEventListener("DOMContentLoaded", () => {
  let addClassForm = document.querySelector("#addClass")
  let addStudentForm = document.querySelector("#addStudent")
  let listStudentsForm = document.querySelector("#listStudents")
  let listStudentsInput = document.querySelector("#listStudentsInput") 

  addClassForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
  })
  addStudentForm.addEventListener("submit", (e) => {
    e.preventDefault()
  })
  listStudentsForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let inputValue = listStudentsInput.value
    let url = 'http://localhost:3000/class/${inputValue}/students'
    debugger
})

})

module.exports