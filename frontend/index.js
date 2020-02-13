document.addEventListener("DOMContentLoaded", ()=>{
    let addClass = document.querySelector("#addClass")
    let addStudent = document.querySelector("#addStudent")
    let studentList = document.querySelector("#studentList")

    let selectClass = document.querySelector("#addStudentClass")
    let selectClassStudentList = document.querySelector("#listClass")

    const updateClassList = async (select) =>{
        select.innerHTML = ""
        let selectOption = document.createElement("option")
        selectOption.innerText = "Select a class"
        selectOption.disabled = true
        selectOption.selected = true
        select.appendChild(selectOption)
        try{
        res = await axios.get("http://localhost:3000/school/")
        debugger
        let classList = res.data.classes
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
            res = await axios.post("http://localhost:3000/school/class",newClassInfo)
        
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
        
        try{
            res = await axios.post(`http://localhost:3000/school/${classEnroll}/enroll`,newStudent)
            if(res.status !== 200){
                alert("Student Enrollment failed")
                addStudent.reset()
            }
        } catch(err){
            console.log(err)
        }
    })

    studentList.addEventListener("submit", async (event)=>{
        event.preventDefault()
        let results = document.querySelector("#studentListResults")
        let showFail = studentList.failingStudents.checked
        let showCity = studentList.listCity.value
        debugger
        let className = studentList.newClassName.value

        if(showCity===""){
            showCity = "all"
        }

        debugger
        try{
            res = await axios.post(`http://localhost:3000/class/${className}/students/?failing=${showFail}&city=${showCity}`)
            debugger
            
        } catch(err){
            console.log(err)
        }
        
    })
})