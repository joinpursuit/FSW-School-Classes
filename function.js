document.addEventListener("DOMContentLoaded", () => {
    let className = document.querySelector("#className")
    let teacher = document.querySelector("#teacherName")
    let stClass = document.querySelector("#class")
    let StName = document.querySelector("#name")
    let age = document.querySelector("#age")
    let city = document.querySelector("#city")
    let btn = document.querySelector("#show")

    const showEverything = async () =>{
        try {
            debugger
            let show = await axios.get("http://localhost:3000/").then((res)=>{
                debugger
            })

            }catch (error) {
            console.log(err)
        }
    }

    const getClass = async () =>{
        try {
            debugger
            let show = await axios.get("http://localhost:3000/").then((res)=>{
                debugger
            })

            }catch (error) {
            console.log(err)
        }
    }
    const getStudent = async () =>{
        try {
            let lsClass = document.querySelector("#lsClass")
            let show = await axios.get(`http://localhost:3000/class/${lsClass.value}/students`).then((res)=>{
                console.log(res.data)
                let pResult = document.querySelector("#pResult")
               if(res.data.message){
                pResult.innerText = (res.data.message + " " + res.data.student)
               } else {
                pResult.innerText = res.data.error
               }
            })

            }catch (error) {
            console.log(err)
        }
    }

    const addClass = async () =>{
        try {
            // debugger
            let show = await axios.post(`http://localhost:3000/class/${className.value}/${teacher.value}`).then((res)=>{
                console.log(res.data)
                let pClass = document.querySelector("#pClass")
               if(res.data.message){
                   pClass.innerText = (res.data.message + " " + res.data.timestamp)
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
            
             await axios.post(`http://localhost:3000/class/${stClass.value}/enroll/`).then((res)=>{
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


    btn.addEventListener("click", ()=>{
        showEverything()
    })

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
        // debugger
        e.preventDefault()
        getStudent()
    })
    


})