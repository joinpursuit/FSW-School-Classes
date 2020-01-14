document.addEventListener("DOMContentLoaded", ()=>{
    let addClass = document.querySelector("#addClass")
    let addStudent = document.querySelector("#addStudent")
    let studentList = document.querySelector("#studentList")

    addClass.addEventListener("submit",(event)=>{
        event.preventDefault()
        debugger
    })

    addStudent.addEventListener("submit",(event)=>{
        event.preventDefault()
    })

    studentList.addEventListener("submit",(event)=>{
        event.preventDefault()
    })
})