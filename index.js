document.addEventListener("DOMContentLoaded", ()=>{

  let displayButton = document.querySelector("#displayBtn");
  let allClassesDiv = document.querySelector("#allClassesDiv");
  let classNameInput = document.querySelector("#className");
  let teacherInput =document.querySelector("#teacher");
  let addClassForm = document.querySelector("#addClass");
  let studentForm = document.querySelector("#studentForm");
  let className = document.querySelector("#studentClass");
  let addList = document.querySelector("listBtn");
  let classNameSelected ="";
 

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

  let p = document.querySelector("#pClass")
  addClassForm.appendChild(p)

  addClassForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let classNameV = classNameInput.value;
    let teacher = teacherInput.value;
    if(!classNameV || !teacher){
      p.innerText ="Please fill out all the information"
      
    } else {
      try {
        let res = await axios.post("http://localhost:3000/class", {name: classNameV, teacher: teacher })
        
        if(res.data.newClass){
          p.innerText = JSON.stringify(`Created a new class: name: ${res.data.newClass }, teacher: ${res.data.teacher }`)
          let li = document.createElement("li")
          debugger
          li.innerText = res.data.newClass
          className.appendChild(li)
          let option = document.createElement("option");
          option.innerText = res.data.newClass
          className.appendChild(option)
        }else{
          p.innerText = res.data.error
        }
      } catch(err){
        p.innerText = `Please fill out all the information or Class already exists `
        
      }
    }
    classNameInput.value = "";
    teacherInput.value = "";
    
  });
  const populateSelect = async()=> {

    try {
      
      let res = await axios.get(`http://localhost:3000/class`)
      //debugger
      let data =res.data.allClasses
     
      for(let key in data){
        let option = document.createElement("option");
        option.innerText = key
        className.appendChild(option)
        
      }
    } catch(err){
      console.log(err);
    }
  }
  populateSelect()

  className.addEventListener("change", (e) =>{
  
    classNameSelected = e.target.value
  })
 
  studentForm.addEventListener("submit", async(e) =>{
    e.preventDefault();
    
    let studentName = document.querySelector("#studentName");
    let studentAge= document.querySelector("#studentAge");
    let studentCity = document.querySelector("#studentCity");
    let studentGrade = document.querySelector("#studentGrade");
    let displayStudent = document.querySelector("#pStudent")
    
    let classNameInput = classNameSelected;
    let studentNameInput = studentName.value;
    let studentAgeInput = studentAge.value;
    let studentCityInput = studentCity.value;
    let studentGradeInput = studentGrade.value;
   
    try{
      
      let res = await axios.post(`http://localhost:3000/class/${classNameInput}`, {name: studentNameInput, age: studentAgeInput, city: studentCityInput, grade: studentGradeInput})
      displayStudent.innerText = JSON.stringify(res.data.className ) + JSON.stringify(res.data.enrolledStudent)
    }catch(err){
      console.log(err)
      displayStudent.innerText = `Please fill out all the information or the class doesn't exist.`;
    }
  })
  addList.addEventListener("click", async(e)=>{
    e.preventDefault();
    let responseList = document.querySelector('#ListResponse');
    let selectedClass= document.querySelector('#searchClass').value
    let city = document.querySelector('#searchCity').value
    let checkBox = document.querySelector('#failingStudents').checked
    let res = await axios.get(`http://localhost:3000/class/${selectedClass}/students?city=${city}&failing=${checkBox}`)
    responseList.innerText = JSON.stringify(res.data)
  
})

})
