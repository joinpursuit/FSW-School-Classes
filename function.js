document.addEventListener("DOMContentLoaded", () => {
    let className = document.querySelector("#className")
    let teacher = document.querySelector("#teacherName")
    let stClass = document.querySelector("#class")
    let StName = document.querySelector("#name")
    let age = document.querySelector("#age")
    let city = document.querySelector("#city")
    let grade = document.querySelector("#grade")
    let btn = document.querySelector("#show")


    const showEverything = async () =>{
        try {
            let show = await axios.get("http://localhost:3000/")
            let p = document.createElement("p")
            p.innerText = show.data

            }catch (error) {
            console.log(err)
        }
    }


    const getStudent = async () =>{
        try {
            let lsClass = document.querySelector("#lsClass")
            let failing = document.querySelector("#checkbox")
            let city = document.querySelector("#lsCity")
        
            
            let show = await axios.post(`http://localhost:3000/class/${lsClass.value}/students`,{failing: failing.checked, city: city.value}).then((res)=>{
                let students = res.data.students
                
            console.log(res.data)
            lsClass.innerText = ""
            let p = document.querySelector(".stuName")
            if(p){
                p.innerText = ""
            }
               
                let pResult = document.querySelector("#pResult")
                let divResult = document.querySelector("#divResult")
                divResult.innerHTML = "";
                let formGetStudents = document.querySelector("#lstudents")
               if(res.data.message){
                pResult.innerText = res.data.message
                // let p = document.querySelector(".stuName")
                // p.innerHTML = ""
                students.forEach(stu => {
                    let p = document.createElement("p")
                    p.class = "stuNames"
                  p.innerText = stu.name
                  formGetStudents.appendChild(p);
                });
               } else {
                pResult.innerText = res.data.error
                   p.innerText = ""
               }
            })

            }catch (error) {
            console.log(err)
          
        }
    }

    const addClass = async () =>{
        try {
            let show = await axios.post(`http://localhost:3000/class/${className.value}/${teacher.value}`).then((res)=>{
                console.log(res.data)
                let pClass = document.querySelector("#pClass")
                className.value = ""
                teacher.value = ""
               if(res.data.message){
                   pClass.innerText = (res.data.message + " at " + res.data.timestamp)
               } else {
                pClass.innerText = res.data.error
               }
            })

            }catch (error) {
            console.log(err)
        }
    }

    const addStudent = async () =>{
        try {
            
             await axios.post(`http://localhost:3000/class/${stClass.value}/enroll/`,{name: StName.value, age: age.value, city: city.value, grade: grade.value}).then((res)=>{
                let student = res.data
                console.log(student)
                let pStudent = document.querySelector("#pStudent")
               if(res.data.message){
                   pStudent.innerText = res.data.message + " " + res.data.timestamp
               } else {
                pStudent.innerText = res.data.error
               }
            })

            }catch (error) {
            console.log(err)
        }
    }


   

    let formClass = document.querySelector("#addClass")

    formClass.addEventListener("submit",(e)=>{
        e.preventDefault()
        addClass()
    })

    let formStudent = document.querySelector("#addStudents")
    formStudent.addEventListener("submit",(e)=>{
        e.preventDefault()
        addStudent()
    })

    let formGetStudents = document.querySelector("#lstudents")
    formGetStudents.addEventListener("submit",(e)=>{
        e.preventDefault()
        
        getStudent()
    })
    


})