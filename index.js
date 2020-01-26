document.addEventListener("DOMContentLoaded", ()=>{
    let addClass = document.querySelector("#addClass")
    let addStudent = document.querySelector("#addStudent")
    let studentList = document.querySelector("#studentList")

    let selectClass = document.querySelector("#addStudentClass")
    let selectClassStudentList = document.querySelector("#listClass")
    const updateClassList = async (select) =>{
        select.innerHTML = ""
        try{
        res = await axios.get("http://localhost:3000/school/")
        
        let classList = res.data.mySchool.classes
            for(key in classList){
                let option = document.createElement("option")
                option.innerText = classList[key]["name"]
                select.appendChild(option)
            }
        } catch (err){
            console.log(err)
        }
        }

    updateClassList(selectClass)
    updateClassList(selectClassStudentList)
    
    addClass.addEventListener("submit", async (event)=>{
        event.preventDefault()
        let newClassName = addClass.newClassName.value.toLowerCase()
        let newClassTeacher = addClass.newClassTeacher.value
        let newClassInfo = {name:newClassName,teacher:newClassTeacher}
        try{
            res = await axios.post("http://localhost:3000/school/classes",newClassInfo)
            debugger 
            if(res.data.status === "failure"){
                alert("Class already exists")
                updateClassList(selectClass)
                updateClassList(selectClassStudentList)
                addClass.reset()
            }else{
                
                updateClassList(selectClass)
                updateClassList(selectClassStudentList)
                addClass.reset()
            }
        
            } catch(err){
                console.log(err)
            }

    })

    addStudent.addEventListener("submit", async(event)=>{
        event.preventDefault()

        let newStudent = {name:addStudent.newStudentName.value, city:addStudent.newStudentCity.value, age:addStudent.newStudentAge.value, grade:addStudent.newStudentGrade.value}
        let classEnroll = addStudent.addStudentClass.value
        debugger
        try{
            res = await axios.post(`http://localhost:3000/school/${classEnroll}/enroll`,newStudent)
            if(res.data.status !== 200){
                alert("Student Enrollment failed")
            }
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