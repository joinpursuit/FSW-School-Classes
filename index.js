document.addEventListener("DOMContentLoaded", () => {
    let classForm = document.querySelector("#addClass");
    // let studentForm = document.querySelector("#addStudent");
    // let listForm = document.querySelector("#studentList");
    let allClassesBtn = document.querySelector("#allClasses");
    allClassesBtn.addEventListener("click", async () => {
        let showAllClasses = document.querySelector("#showAllClasses");
        let p = document.createElement("p");
        showAllClasses.appendChild(p);
        try {
            let res = await axios.get("http://localhost:3000/class");
            let allClasses = JSON.stringify(res.data.allClasses);
            p.innerHTML = allClasses;
        } catch (error) {
            console.log(error);
        }
    })

    classForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // addClass();
        addClassToDom()
    })

})

const addClass = async () => {
    try {
        let name = document.querySelector("#className").value;
        let teacher = document.querySelector("#teacherName").value;
        let res = await axios.post("http://localhost:3000/class", {
            name,
            teacher
        });  
        console.log(res)
        return res 
    } catch (error) {
        console.log(error)
    }
}

const addClassToDom = async () => {
    data = await addClass()
    console.log(data.data['class']);
    
    let container = document.querySelector("#addClass");

    let newClass = document.createElement("div");
    newClass.id = 'newClass';
    let className = document.createElement("p");
    let teacherName = document.createElement("p");
    
    className.innerText = data.data.class.name
    teacherName.innerText = data.data.class.teacher

    newClass.append(className,teacherName)

    container.append(newClass)
}