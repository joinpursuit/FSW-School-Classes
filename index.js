document.addEventListener("DOMContentLoaded", ()=>{
    let addClass = document.querySelector("#addClass")
    let addStudent = document.querySelector("#addStudent")
    let studentList = document.querySelector("#studentList")

    addClass.addEventListener("submit", async (event)=>{
        event.preventDefault()
        let newClass = {name:addClass.addClassName.value,teacher:addClass.addClassTeach.value}
        try{
            classPost = await axios.post("http://localhost:3000/school/classes",newClass).then(res =>{
                debugger
            })
        } catch(err){
            console.log(err)
        }
    })

    addStudent.addEventListener("submit",(event)=>{
        event.preventDefault()
        let student = {name:addStudent.addStudentName.value, age:addStudent.addStudentAge.value, city:addStudent.addStudentCity.value, grade:addStudent.addStudentGrade.value}
        let newStudent = {name:addStudent.addStudentClass.value,student:student}
        try{
            classPost = await axios.post("http://localhost:3000/school/classes",newStudent).then(res =>{
                debugger
            })
        } catch(err){
            console.log(err)
        }
    })

    studentList.addEventListener("submit",(event)=>{
        event.preventDefault()
    })
})