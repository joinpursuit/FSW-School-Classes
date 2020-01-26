document.addEventListener("DOMContentLoaded", ()=>{
    let addClass = document.querySelector("#addClass")
    let addStudent = document.querySelector("#addStudent")
    let studentList = document.querySelector("#studentList")

    const updateClassList = async () =>{
        let selectClass = document.querySelector("#addStudentClass")
        selectClass.innerHTML = ""
        try{
        res = await axios.get("http://localhost:3000/school/")
        
        let classList = res.data.mySchool.classes
            for(key in classList){
                let option = document.createElement("option")
                option.innerText = classList[key]["name"]
                selectClass.appendChild(option)
            }
        } catch (err){
            console.log(err)
        }
        }

        updateClassList()
        
        addClass.addEventListener("submit", async (event)=>{
            event.preventDefault()
            let newClassName = addClass.newClassName.value.toLowerCase()
            let newClassTeacher = addClass.newClassTeacher.value
            let newClassInfo = {name:newClassName,teacher:newClassTeacher}
            let selectClass = document.querySelector("#addStudentClass")
            try{
                res = await axios.post("http://localhost:3000/school/classes",newClassInfo)
                debugger 
                if(res.data.status === "failure"){
                    alert("Class already exists")
                    selectClass.innerHTML = ""
                    updateClassList()
                    addClass.reset()
                }else{
                    
                    updateClassList()
                    addClass.reset()
                }
            
                } catch(err){
                    console.log(err)
                }

    })

    addStudent.addEventListener("submit", async(event)=>{
        event.preventDefault()

        let student = {name:addStudent.addStudentName.value, age:addStudent.addStudentAge.value, city:addStudent.addStudentCity.value, grade:addStudent.addStudentGrade.value}
        let newStudent = {name:addStudent.addStudentClass.value,student:student}
        try{
            await axios.post("http://localhost:3000/school/students",newStudent).then(res =>{
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
        let showFail = studentList.failingStudents
        let showCity = studentList.listCity
        // let showFailing = document.querySelector("#failingStudents")
        debugger
    })
})