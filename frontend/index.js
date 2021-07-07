document.addEventListener("DOMContentLoaded", ()=>{
    let addClass = document.querySelector("#addClass")
    let addStudent = document.querySelector("#addStudent")
    let studentList = document.querySelector("#studentList")

    let selectClass = document.querySelector("#addStudentClass")
    let selectClassStudentList = document.querySelector("#listClass")
    let results = document.querySelector("#results")

    const updateClassList = async (select) =>{
        select.innerHTML = ""
        let selectOption = document.createElement("option")
        selectOption.innerText = "Select a class"
        selectOption.disabled = true
        selectOption.selected = true
        select.appendChild(selectOption)
        try{
        res = await axios.get("http://localhost:3000/school/")
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
        results.innerHTML = ""
        let newClassName = addClass.newClassName.value.toLowerCase()
        let newClassTeacher = addClass.newClassTeacher.value
        let newClassInfo = {name:newClassName,teacher:newClassTeacher}
        try{
            res = await axios.post("http://localhost:3000/school/class",newClassInfo)
            
            if(res.data.status === "failure"){
                let h4 = document.createElement("h4")
                h4.innerText="Class already exists"
                results.appendChild(h4)
                updateClassList(selectClass)
                updateClassList(selectClassStudentList)
                addClass.reset()
            }else{
                let h4 = document.createElement("h4")
                h4.innerText="Success Class added"
                results.appendChild(h4)
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
        results.innerHTML = ""
        
        let newStudent = {name:addStudent.newStudentName.value, city:addStudent.newStudentCity.value, age:addStudent.newStudentAge.value, grade:addStudent.newStudentGrade.value}
        let classEnroll = addStudent.addStudentClass.value

        try{
        res = await axios.post(`http://localhost:3000/school/${classEnroll}/enroll`,newStudent)
        if(res.data.status === "failure"){
            let h4 = document.createElement("h4")
            h4.innerText="Student Enrollment failed, student already enrolled"
            results.appendChild(h4)
            addStudent.reset()
        } else {
            let h4 = document.createElement("h4")
            h4.innerText="Student Enrollment successful, student  enrolled"
            results.appendChild(h4)
            addStudent.reset()

        }
        } catch(err){
            console.log(err)
        }
    })

    studentList.addEventListener("submit", async (event)=>{
        event.preventDefault()
        results.innerHTML=""
        let showFail = studentList.failingStudents.checked
        let showCity = studentList.listCity.value
        let selectedClass = studentList.listClass.value

        if(showCity===""){
            showCity = "all"
        }

        try{
            res = await axios.get(`http://localhost:3000/school/${selectedClass}/students/?failing=${showFail}&city=${showCity}`)
            
            if(res.data.status==="failure"){
                let failMessage = document.createElement("h4")
                failMessage.innerText = res.data.message
                results.appendChild(failMessage)
            } else { 
                reqStudentList= res.data.students

                
                let ul =document.createElement("ul")
                reqStudentList.forEach(student =>{
                    let li = document.createElement("li")
                    let studentInfo = ""
                    for(key in student){
                        studentInfo += `${key}: ${student[key]} `
                    }
                    li.innerText = studentInfo
                    ul.appendChild(li)
                })
                
                results.appendChild(ul)
            }
            
        } catch(err){
            console.log(err)
        }
        
    })
})