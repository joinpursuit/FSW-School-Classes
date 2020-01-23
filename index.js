
document.addEventListener("DOMContentLoaded",()=>{
    let addButton = document.querySelector("#addButton")
    addButton.addEventListener("click",addClass)
    let enrollButton = document.querySelector("#enrollButton")
    enrollButton.addEventListener("click",enrollStudent)
    let updateButton = document.querySelector("#updateButton")
    updateButton.addEventListener("click",updateStudent)
    let listButton = document.querySelector("#listButton")
    listButton.addEventListener("click", listStudents)
})
const addClass = async(event)=>{
    event.preventDefault()
    let nameOfClass = document.querySelector("#className")
    let nameOfTeacher = document.querySelector("#teacherName")
    let nameOfClassInput = nameOfClass.value
    let teacherNameInput = nameOfTeacher.value
    let classInfo = {
        teacher:teacherNameInput,
        classes:nameOfClassInput

    }
    try{
        let response = axios.post("http://localhost:4000/classes", {classInfo})
        console.log(response)
        let p = document.createElement("p")
        debugger

        p.innerText = response
        let classAdd = document.querySelector("#classAdd")
        classAdd.appendChild(p)

    }catch(err){
        console.log(err)
    }


}
const enrollStudent = async(event)=>{

}
const updateStudent = async(event)=>{
    
}
const listStudents = async(event)=>{
    
}