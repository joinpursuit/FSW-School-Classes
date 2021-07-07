document.addEventListener("DOMContentLoaded", () => {
  let addClassForm = document.querySelector(".addClass")
  let addStudentForm = document.querySelector(".addStudent")
  let listStudentsForm = document.querySelector(".listStudents")
  
  addClassForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let addAClassLi = document.querySelector("#addAClass");
    // debugger
    let classNameInput = e.target.children[0].value;
    let teacherNameInput = e.target.children[1].value;
    // let newClass = [];

    // newClass.push({name: classNameInput.value, teacher: teacherNameInput.value})
    await axios.post("http://localhost:3000/class/", {name: classNameInput, teacher: teacherNameInput}) 
    
    addAClassLi.innerHTML = "";
    addAClassLi.innerText = "You've created a class named " + classNameInput + " with the teacher " + teacherNameInput;
  })

  addStudentForm.addEventListener("submit", async (e) => {
     e.preventDefault()
     let addAStudentLi = document.querySelector("#addAStudent");
     let classInput = e.target.children[0].value; 
     let nameInput = e.target.children[1].value;
     let ageInput = e.target.children[2].value;
     let cityInput = e.target.children[3].value;
     let gradeInput = e.target.children[4].value;

     await axios.post(`http://localhost:3000/class/${classInput}/enroll`, {name: nameInput, age: ageInput, city: cityInput, grade: gradeInput})
    
     addAStudentLi.innerHTML = "";
     addAStudentLi.innerText = "You've created a student named " + nameInput
   })

   listStudentsForm.addEventListener("submit", async(e) => {
     e.preventDefault()
     let classInput = e.target.children[0].value;
     let cityInput = e.target.children[1].value;
     let checkboxInput = document.querySelector("#checkbox").checked;
     let ul = document.querySelector("#listAllStudents");
     
    //  debugger
     await axios.get(`http://localhost:3000/class/${classInput}/students`, {failing: checkboxInput, city: cityInput}).then((res)=> {
       console.log(res);
       const { students } = res.data
       console.log(students);
       
        students.forEach((el, i) => {
          if(i === 0){
            let p = document.createElement("p")
            p.innerText = `Students enrolled in ${classInput}`
            ul.appendChild(p)
          }
          let li = document.createElement("li")
          li.innerText = el.name
          ul.appendChild(li)

        })

       debugger
       
     })
  
    //  let url = `http://localhost:3000/class/${classInput}/students`
    // await axios.get(url).then(res => {
    //      console.log(res)
    //     debugger
    //      let li = document.createElement("li")
    //      li.innerHTML = ""
    //  })
   })

})
  