document.addEventListener("DOMContentLoaded", ()=>{

  let displayButton = document.querySelector("#displayBtn");
  let allClassesDiv = document.querySelector("#allClassesDiv");
  let classNameInput = document.querySelector("#className");
  let teacherInput =document.querySelector("#teacher");
  let addClassForm = document.querySelector("#addClass");

  displayButton.addEventListener("click", async()=>{
    try {
      let res = await axios.get("http://localhost:3000/class")
      let p = document.createElement("p")
      p.innerText = JSON.stringify(res.data.allClasses)
      allClassesDiv.appendChild(p)

    } catch(err){
      console.log(err);
      
    }
  })

  let p = document.createElement("p")
  addClassForm.appendChild(p)

  addClassForm.addEventListener("submit",async(e)=>{
    e.preventDefault();

    if(classNameInput.value && teacherInput.value){
      let className = classNameInput.value;
      let teacher = teacherInput.value;
    
      try{
        await axios.post("http://localhost:3000/class", {name: className, teacher: teacher }).then(res=>{
          console.log(res)
          p.innerText = "just addded class " + res.data.nStudent.name + " at " + res.data.timestamp
          // debugger
        })

      }catch(err){
        p.innerText = "Please fill out all the information or Class already exists." + " at " + new Date();
        
      }
    }

  });
  


  let studentForm = document.querySelector("#studentForm");


 
   let displayStudent = document.createElement("p");
  studentForm.addEventListener("submit", async(e) =>{
    console.log('hi mom')
    e.preventDefault();
    let className = document.querySelector("#studentClass");
    let studentName = document.querySelector("#studentName");
    let studentAge= document.querySelector("#studentAge");
    let studentCity = document.querySelector("#studentCity");
    let studentGrade = document.querySelector("#studentGrade");
    
    let classNameInput = className.value;
    let studentNameInput = studentName.value;
    let studentAgeInput = studentAge.value;
    let studentCityInput = studentCity.value;
    let studentGradeInput = studentGrade.value;

    try{
      await axios.post(`http://localhost:3000/class/${classNameInput}/enroll`, {studentName: studentNameInput, studentAge: studentAgeInput, studentCity: studentCityInput, studentGrade: studentGradeInput})
      .then(res=>{
        console.log(res + "enroll")
         displayStudent.innerText = "just addded student " + " at " + res.data.timestamp
         // debugger
        //res.data.newClass.name + " at " + res.data.timestamp
          // debugger
        debugger
      })
    }catch(err){
      displayStudent.innerText = "Please fill out all the information for the student", new Date ();
    }
  })

  







})
