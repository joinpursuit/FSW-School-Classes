document.addEventListener("DOMContentLoaded", ()=>{
    let addClass = document.querySelector("#addClass")
    let addStudent = document.querySelector("#addStudent")
    let studentList = document.querySelector("#studentList")

    const updateClassList = (classList) =>{
        let selectClass = document.querySelector("#addStudentClass")
        for(key in classlist){
            debugger
            let option = document.createElement("option")
            option.innerText = classList[key]["name"]
            selectClass.appendChild(option)
        }
    }

    addClass.addEventListener("submit", async (event)=>{
        event.preventDefault()
        let newClass = {name:addClass.addClassName.value,teacher:addClass.addClassTeach.value}
        let selectClass = document.querySelector("#addStudentClass")
        selectClass.innerHTML = ""
        try{
            classPost = await axios.post("http://localhost:3000/school/classes",newClass).then(res =>{
                let newClasses = res.data.mySchool.classes
                debugger

                for(key in newClasses){

                     let option = document.createElement("option")
                    option.innerText = newClasses[key]["name"]
                    selectClass.appendChild(option)
                }
            }
            )
        } catch(err){
            console.log(err)
        }

    })

    addStudent.addEventListener("submit", async(event)=>{
        event.preventDefault()

        let student = {name:addStudent.addStudentName.value, age:addStudent.addStudentAge.value, city:addStudent.addStudentCity.value, grade:addStudent.addStudentGrade.value}
        let newStudent = {name:addStudent.addStudentClass.value,student:student}
        try{
            classPost = await axios.post("http://localhost:3000/school/students",newStudent).then(res =>{
                debugger
                console.log("NEW STUDENT: " + newStudent)    
                let schoolData = res.data.mySchool.classes
                console.log(schoolData)
            })
        } catch(err){
            console.log(err)
        }
    })

    studentList.addEventListener("submit",(event)=>{
        event.preventDefault()
    })
})