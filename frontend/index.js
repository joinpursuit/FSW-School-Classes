document.addEventListener("DOMContentLoaded", () => {
let select1 = document.querySelector("populateClasses");
  const populateClasses = async () => {
      try {
          let res = await axios.get("`http://localhost:3000/classes");
          let displayClasses = res.data;
          displayClasses.forEach(displayedClass => {
              let option = document.createElement("option");
              option.innerText = this.classes; 
              option.value = school.classes;
              select.appendChild(option)
          })
      } catch(err) {
          console.log(err);
      }
  }

let select2 = document.querySelector("populateStudents");
    const populateStudents = async () => {
        try {
            let res = await axios.get("");
            let displayStudents = res.data.results;
            displayStudents.forEach(student => {
                let option = document.createElement("option");
                option.innerText = `${student.name} ${student.age} ${student.city} ${student.grade}`
                // option.value = student.homeworld;
                select.appendChild(option)
            })
        } catch(err) {
            console.log(err);
        }
    }

let mainDiv = document.querySelector("#mainDiv")
let populateClasses = document.querySelector("#populateClasses")
let populateStudents = document.querySelector("#populateStudents")
let addClassDivHead = document.querySelector("#addClassDivHead")
let addClassDivMain = document.querySelector("#addClassDivMain")
let className = document.querySelector("#className")
let teacherName = document.querySelector("#teacherName")
let addClassBtn = document.querySelector("#addClassBtn")
let newClassDisplay = document.querySelector("#newClassDisplay")
let newClassDisplayUL = document.querySelector("#newClassDisplayUL")
let enrollStudentDiv = document.querySelector("#enrollStudentDiv")
let addClassForm = document.querySelector("#addClassForm")
let enrollStudentForm = document.querySelector("#enrollStudentForm")
let sClassName = document.querySelector("#sClassName")
let studentName = document.querySelector("#studentName")
let studentAge = document.querySelector("#studentAge")
let studentCity = document.querySelector("#studentCity")
let studentGrade = document.querySelector("#studentGrade")
let studenetEnrollBtn = document.querySelector("#studenetEnrollBtn")
let newStudentDisplay = document.querySelector("#newStudentDisplay")
let newStudentDisplayUL = document.querySelector("#newStudentDisplayUL")
let failingForm = document.querySelector("#failingForm")
let enterClass = document.querySelector("#enterClass")
let addCity = document.querySelector("#addCity")
let displayFailing = document.querySelector("#displayFailing")
let fsBtn = document.querySelector("#fsBtn")
let failingStudentList = document.querySelector("#failingStudentList")
let failingStudentListUL = document.querySelector("#failingStudentListUL")
// let res = url




addClassForm.addEventListener("submit", async (event) => {
    e.preventDefault()
    // let className = document.querySelector("#className")
    // let teacherName = document.querySelector("#teacherName")
    ul.innerHTML = "";
    let res = await axios.post(`http://localhost:3000/class`, {name: className, teacher: teacherName})
    let h3 = document.createElement("h3");
    h3.innerText = res.data.message
    // `${req.body.name} was added to the list of classes being taught at Hogwarts. ${req.body.teacher} is leading the class.`
    newClassDisplay.appendChild(h3)

    // addClassForm.reset()  
  })

  enrollStudentForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let sClassName = document.querySelector("#sClassName").value

    let name = document.querySelector("#studentName").value
    let age = document.querySelector("#studentAge").value
    let city = document.querySelector("#studentCity").value
    let grade = document.querySelector("#studentGrade").value
    let res = await axios.post("http://localhost:3000/class/:className/enroll",{class: sClassName.value, name: name.value, age: age.value, grade: grade.value, city: city.value})
    let h3 = document.createElement("h3")
    h3.innerText = res.data.message
    // `${req.body.age} year old ${req.body.name} from ${req.body.city}is now enrolled in the ${className} class with a GPA of ${req.body.grade}.`
    newStudentDisplay.appendChild(h3)
  })

    
 
  
    // let failingForm = document.querySelector("#failingForm");
    // let addCity = document.querySelector("#addCity");
    // let displayFailing = document.querySelector("#displayFailing");
    failingForm.addEventListener("submit", e => {
      e.preventDefault();
      addClassFormm.innerHTML = "";
      enrollStudentFormm.innerHTML = "";
      failingFormm.innerHTML = "";

      let res = await axios.get(`http://localhost:3000/class/${className}/students`);
      failingStudentListUL.innerText = "";
        if(city != "" && failing === true){
            let h3 = document.createElement("h3");
            h3.innerText = res.data.message
            failingStudentListUL.appendChild(h3);
            for(let i = 0; i < list.data.length; i ++){
                if(res.data[i]["city"] === city && res.data[i]["grade"] < 70){
                    let li = document.createElement("li");
                    li.innerText = res.data.message;
                    failingStudentListUL.appendChild(li);
                }
            }
        } else if(city != "" && failing === false){
            let h3 = document.createElement("h3");
            h3.innerText = res.data.message;
            failingStudentListUL.appendChild(h3);
            for(let i = 0; i < res.data.length; i ++){
                if(res.data[i]["city"] === city){
                    let li = document.createElement("li");
                    li.innerText = res.data.message;
                    failingStudentListUL.appendChild(li);
                }
            }
        } else if(city === "" && failing === true){
            let h3 = document.createElement("h3");
            failingStudentListUL.appendChild(h3);
            h3.innerText = res.data.message;
            for(let i = 0; i < res.data.length; i ++){
                if(res.data[i]["grade"] < 70){
                    let li = document.createElement("li");
                    li.innerText = res.data.message;
                    failingStudentListUL.appendChild(li);
                }
            }
        } else {
            let h3 = document.createElement("h3");
            h3.innerText = res.data.message;
            failingStudentListUL.appendChild(h3);
            for(let i = 0; i < res.data.length; i ++){
                let li = document.createElement("li");
                li.innerText= res.data.message;
                failingStudentListUL.appendChild(li);
        };
      
    });

  });