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
            let host = await axios.post(`http://localhost:4000/classes`, {teacher: teacherInput, class: classesInput})
            p.innerText = host.data.message
            classAdd.appendChild(p)
      
    

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
        let host = await axios.post(`http://localhost:4000/classes/enroll`, {class: className, name, age, grade, city})
        debugger
        p.innerText = host.data.message
        studentEnroll.appendChild(p)
  
})
listStudents.addEventListener("submit",async(e)=>{
    e.preventDefault()
    let className = document.querySelector("#classList").value
    className.value = ""
    let failing = document.querySelector("#fail")
    let ul = document.querySelector("ul")
    let li = document.createElement("li")
    let host = await axios.post(`http://localhost:4000/classes/lists`, {className:className,failing:failing})
    li.innerText = host.data.message
    ul.appendChild(li)
})

// const getStudentsByClass = async (event) => {
//     event.preventDefault()
//     let className = document.querySelector("#classList")
//     let classNameInput = className.value;
//     className.value = ""
//     let failing = document.querySelector("#fail")
//     let host = `http://localhost:4000/classes/${classNameInput}/lists`
//     let response = await axios.post(host, className)
//     let ul = document.querySelector("ul")
//     let li = document.createElement("li")
    
//     try{
//         if(failing.checked === false){
//             let result = axios.get(response)
//             classNameInput.innerText = JSON.stringify(response.data.students)
//             for(let el of result.data){
//                 students += el
                
//                 li.innerText = students.message
//                 ul.appendChild(li)
//             }

//         }else{
            
//         }

//     }catch(error){
//         console.log(error)
//     }
// }

