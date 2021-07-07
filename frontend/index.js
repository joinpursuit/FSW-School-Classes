document.addEventListener("DOMContentLoaded", ()=>{
    let ClassDiv = document.querySelector("#newClassDiv")
    let ClassForm = document.querySelector("#newClassForm")
    let StudentDiv = document.querySelector("#newStudentDiv")
    let StudentForm = document.querySelector("#newStudentForm")
    let SortDiv = document.querySelector("#sortDiv")
    let SortForm = document.querySelector("#sortForm")
    let Show = document.querySelector("#show")
    let addClassDiv = document.querySelector("#addClassDiv")
    let addStudentDiv = document.querySelector("#addStudentDiv")
    console.log("pie");

    ClassForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        addClassDiv.innerHTML = ""
        let theClass = document.querySelector("#newClass").value
        let theTeacher = document.querySelector("#newTeacher").value
        let p = document.createElement("p")
        let res = await axios.post(`http://localhost:3000/class`,{teacher: theTeacher, name: theClass})
        p.innerText = res.data.message
        addClassDiv.appendChild(p)
    })

    StudentForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        addStudentDiv.innerHTML = ""
        let className = document.querySelector("#class").value
        className.replace(" ", "%20")
        let name = document.querySelector("#student").value
        let age = document.querySelector("#age").value
        let grade = document.querySelector("#grade").value
        let city = document.querySelector("#city").value
        let p = document.createElement("p")
        let res = await axios.post(`http://localhost:3000/class/${className}/enroll`,{name, age, grade, city})
        p.innerText = res.data.message
        addStudentDiv.appendChild(p)
    })

    SortForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        Show.innerHTML = ""
        let className = document.querySelector("#sortClass").value
        className.replace(" ", "%20")
        let failing = document.querySelector("#failingStudent")
        if (failing.checked === true){
            console.log("hey");
            let res = await axios.get(`http://localhost:3000/${className}/students?failing=true`)
            let students = res.data.payload
            students.forEach((student) => {
                let {name, age, city, grade} = student
                let p = document.createElement("p")
                p.innerText = `Name: ${name}, Age: ${age}, City: ${city}, Grade: ${grade}`
                Show.appendChild(p)
                })
        } else {
                let res = await axios.get(`http://localhost:3000/${className}/students?failing=false`)
                let students = res.data.payload
                students.forEach((student) => {
                    let {name, age, city, grade} = student
                    let p = document.createElement("p")
                    p.innerText = `Name: ${name}, Age: ${age}, City: ${city}, Grade: ${grade}`
                    Show.appendChild(p)
                    })
        }
        })
    
})
