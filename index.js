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
    // console.log(classNameInput.value, teacherInput.value)
    if(classNameInput.value && teacherInput.value){
      let className = classNameInput.value;
      let teacher = teacherInput.value;

    
      try{
        await axios.post("http://localhost:3000/class", {name: className, teacher: teacher }).then(res=>{
          p.innerText = "just addded class " + res.data.newClass.name
          // debugger
        })

      }catch(err){
        p.innerText = "Please fill out all the information or Class already exists";
        //timestamp: "YYYY, MM/DD HH:MM:SS"
      }
    }

  })

  







})
