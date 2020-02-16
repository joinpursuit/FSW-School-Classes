document.addEventListener("DOMContentLoaded", () => {
  let addClassForm = document.querySelector(".addClass")
  let addStudentForm = document.querySelector(".addStudent")
  let listStudentsForm = document.querySelector(".listStudents")
  let listStudentsInput = document.querySelector("#listStudentsInput") 
  
  addClassForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let addAClassLi = document.querySelector("#addAClass");
    let classNameInput = document.querySelector("#classNameInput") ;
    let teacherNameInput = document.querySelector("#teacherNameInput");
    // let newClass = [];

    // newClass.push({name: classNameInput.value, teacher: teacherNameInput.value})
    await axios.post("http://localhost:3000/class/", {name: classNameInput.value, teacher: teacherNameInput.value}) 
    
    addAClassLi.innerHTML = "";
    addAClassLi.innerText = "You've created a class " + {name: classNameInput.value, teacher: teacherNameInput.value};
    // debugger
  })

})
  

//  addStudentForm.addEventListener("submit", (e) => {
//     e.preventDefault()
//   })

//   listStudentsForm.addEventListener("submit", async(e) => {
//     e.preventDefault()
//     let inputValue = listStudentsInput.value
//     let url = `http://localhost:3000/class/${inputValue}/students`
//    await axios.get(url).then(res => {
//         console.log(res)
//        debugger
//         let li = document.createElement("li")
//         li.innerHTML = ""
//     })
//     // debugger
// })