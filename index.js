document.addEventListener("DOMContentLoaded", () => {
    
    let teacherInput =  document.querySelector("#teacherInput")
    let classInput = document.querySelector("#classInput")
    let allClassesDiv = document.querySelector("#allClasses")
    let button =  document.querySelector("#allClassesButton") 
    let collapse = document.querySelector("#collapse")
    let form =  document.querySelector("#classForm")
// class search
    let classSearchDiv = document.querySelector("#studentsByClass")
    let classSearchForm = document.querySelector("#classSearch")
    let classSearchInput = document.querySelector("#classSearchInput")
    let classSearchButton = document.querySelector("#classSearchButton")
// enroll student elements
    let enrollStudentsDiv =  document.querySelector("#enrollStudentsDiv")
    let enrollStudentsForm = document.querySelector("#enrollStudents")
    let studentNameInput = document.querySelector("#studentNameInput")
    let studentAgeInput = document.querySelector("#studentAgeInput")
    let studentClassInput = document.querySelector("#classToEnroll")

    enrollStudentsForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            let data = await axios.post(`http://localhost:3000/classes/enroll/${studentNameInput.value}/${studentClassInput.value}`)
            debugger
        } catch (error) {
            
        }
    })

    button.addEventListener("click", async () => {
        let data = await axios.get("http://localhost:3000/")
        let div = document.querySelector("#allClasses")
        let classes = data.data
        let h2 = document.createElement("h2")
        div.innerHTML = ""
        h2.innerText = "ALL CLASSES"
        div.appendChild(h2)
        let ul = document.createElement("ul")
        div.appendChild(ul)
        for (let classRoom in classes) {
            let li = document.createElement("li")
            li.innerText = classRoom
            ul.appendChild(li)
        } 
    })

    classSearchForm.addEventListener("submit", async(e) => {
        e.preventDefault()
        try {
            let data = await axios.get(`http://localhost:3000/classes/${classSearchInput.value}`)
            let students = data.data 
            let ul = document.createElement("ul")
            ul.innerHTML = ""
            students.forEach((student) => {
                let li = document.createElement("li")
                li.innerText = `Student name: ${student.name},  Age: ${student.age},  Grade: ${student.grade}`
                ul.appendChild(li)
            })
            classSearchDiv.appendChild(ul)
            debugger
        } catch (error) {
            
        }
    })

    
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        try {
            let data = await axios.post(`http://localhost:3000/class/${classInput.value}/addClass`, {})
            data.data.class = classInput.value 
            let h2 = document.createElement("h2")
            h2.innerHTML = ""
            h2.innerText = `Congrats! You've created a new class: ${classInput.value}`
            let messages = document.querySelector("#messages")
            messages.appendChild(h2)
        } catch (error) {

        }
    })

    // collapse.addEventListener("click", () => {
    //     allClassesDiv.innerHTML = ""
    // })
    document.body.appendChild(button)
    

    

    

})