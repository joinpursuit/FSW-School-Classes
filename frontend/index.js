document.addEventListener("DOMContentLoaded", () => {
    let select = document.querySelector("#populateClasses");
    const populateClasses = async () => {
            let res = await axios.get("http://localhost:3000/class/");
            let displayClasses = Object.keys(res.data.class);
            displayClasses.forEach((el) => {
                let option = document.createElement("option");
                option.innerText = el; 
                select.appendChild(option)
            })
        }
    // in = index
    // of = value
    const getAllStudentsInClass = async (className) => {
        try {

            let studentsByClassDiv = document.querySelector("#studentsByClassDiv")
            let res = await axios.get(`http://localhost:3000/class/${className}`);
            let grabClass = res.data.allStudents;
                grabClass.forEach((showStudent) => {
                let {name, city, age, grade, house} = showStudent
                const listStudent = `Class: ${className} Name: ${name} Age: ${age} City: ${city} Grade: ${grade} House: ${house}`
                let p1 = document.createElement("p");
                p1.innerText = listStudent;
                studentsByClassDiv.appendChild(p1)
    })
} catch(error) {
    console.log(error)
    }
}
populateClasses()
select.addEventListener("change", (event) => {
   getAllStudentsInClass(event.target.value)
  
})
    let newClassDisplay = document.querySelector("#newClassDisplay")
    let newClassDisplayUL = document.querySelector("#newClassDisplayUL")
    let addClassForm = document.querySelector("#addClassForm")
    let enrollStudentForm = document.querySelector("#enrollStudentForm")
    let newStudentDisplay = document.querySelector("#newStudentDisplay")
    let newStudentDisplayUL = document.querySelector("#newStudentDisplayUL")
    let failingForm = document.querySelector("#failingForm")



addClassForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    let className = document.querySelector("#className").value
    let teacherName = document.querySelector("#teacherName").value
try {
    newClassDisplayUL.innerHTML = "";
    let res = await axios.post(`http://localhost:3000/class/add`, {name: className, teacher: teacherName})
    let h3 = document.createElement("h3");
    h3.innerText = res.data.message
    newClassDisplay.appendChild(h3)
} catch (error) {
    console.log(error)
} 
  })
enrollStudentForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    let sClassName = document.querySelector("#sClassName").value
    let name = document.querySelector("#studentName").value
    let age = document.querySelector("#studentAge").value
    let city = document.querySelector("#studentCity").value
    let grade = document.querySelector("#studentGrade").value
    let house = document.querySelector("#studentHouse").value
try {
    newStudentDisplayUL.innerHTML = "";
    let res = await axios.post(`http://localhost:3000/class/${sClassName}/enroll`,{class: sClassName, name: name, age: age, grade: grade, city: city, house: house})
    let h3 = document.createElement("h3")
    h3.innerText = res.data.message
    newStudentDisplay.appendChild(h3)
} catch (error){
    console.log(error)
}
  })
failingForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        let failingStudentList = document.querySelector("#failingStudentList")
        let allStudentsList = document.querySelector("#allStudentsList")
        let enterClass = document.querySelector("#enterClass").value
        let grabFailing = document.querySelector("#grabFailing").checked
        let addCity = document.querySelector("#addCity").value;
    
        if(grabFailing === true && addCity) {
            let res = await axios.get(`http://localhost:3000/class/${enterClass}/students?failing=true`)
            let failingStudents = res.data.students
            failingStudents.forEach((failedStudent) => {
            let {name, city, age, grade, house} = failedStudent
            const listStudent = `From the city of ${city}, ${age} year old ${name} has failed the ${enterClass} class with an overall grade of a ${grade}. They belong to the ${house} house.`
            let p2 = document.createElement("p");
            p2.innerText = listStudent;
            failingStudentList.appendChild(p2)
            })
        } else if (grabFailing){
            let res = await axios.get(`http://localhost:3000/class/${enterClass}/students?failing=true`)
            let failingStudents = res.data.students;
            failingStudents.forEach((failedStudent) => {
            let {name, age, city, grade, house} = failedStudent
            const showList = `From the ${house} house, ${age} year old ${name} has failed the ${enterClass} class with an overall grade of a ${grade}.`
            let p3 = document.createElement("p");
            p3.innerText = showList;
            failingStudentList.appendChild(p3)
            })
        } else {
            let res = await axios.get(`http://localhost:3000/class/${enterClass}/students?failing=false`)      
            let allStudents = res.data.students;
            allStudents.forEach((students) => {
            let {name, age, city, grade, house} = students
            const listAllStudents = `There are no failing students in this class but you are welcomed to view it yourself. Name: ${name} Age: ${age} City: ${city} Grade: ${grade} House: ${house}`
            let p4 = document.createElement("p");
            p4.innerText = listAllStudents;
            allStudentsList.appendChild(p4)
            })
        }  
    })
}) 