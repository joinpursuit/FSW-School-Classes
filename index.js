let classAdd = document.querySelector("#classAdd")
let addClass = document.querySelector("#addClass")
let studentEnroll = document.querySelector("#studentEnroll")
let addStudent = document.querySelector("#addStudent")
let list = document.querySelector("#list")
let listStudents = document.querySelector("#listStudents")
addClass.addEventListener("submit",async (e)=>{
    e.preventDefault()
            let classes = document.querySelector("#className")
            let teacher = document.querySelector("#teacherName")
            let classesInput = classes.value
            let teacherInput = teacher.value
            classesInput.value = ""
            teacherInput.value = ""
            let p = document.createElement("p")
            try{

                let host = await axios.post(`http://localhost:4000/class`, {teacher: teacherInput, class: classesInput})
                p.innerText = host.data.message
                classAdd.appendChild(p)
            }catch(error){
                
            }
      
    

})
addStudent.addEventListener("submit",async(e)=>{
    e.preventDefault()
        let className = document.querySelector("#class").value
        let name = document.querySelector("#student").value
        let age = document.querySelector("#age").value
        let city = document.querySelector("#city").value
        let grade = document.querySelector("#grade").value
        className.value = ""
        name.value = ""
        age.value = ""
        grade.value = ""
        city.value = ""
        let p = document.createElement("p")
        try{

            let host = await axios.post(`http://localhost:4000/class/${className}`, {class: className, name, age, grade, city})
            debugger
            p.innerText = host.data
            studentEnroll.appendChild(p)
        }catch(error){
            console.log(error)
        }
  
})
listStudents.addEventListener("submit",async(e)=>{
    e.preventDefault()
    let className = document.querySelector("#classList").value
    let city = document.querySelector("#cityList").value
    className.value = ""
    city.value =""
    let failing = document.querySelector("#fail")
    let ul = document.querySelector("ul")
    let li = document.createElement("li")
    if (failing.checked) {
        failing = 'true';
    } else {
        failing = 'false';
    }
    try{
        
        let host = await axios.post(`http://localhost:4000/class/${className}/students?failing=${failing}&city=${city}`, {className:className,failing:failing})
        host.forEach(el=>{
        li.innerText = el.name + el.age + el.city + el.grade
        ul.appendChild(li)
        })
    }catch(error){
        console.log(error)
    }
})

