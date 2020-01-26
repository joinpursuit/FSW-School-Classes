document.addEventListener("DOMContentLoaded", () => {
    let classForm = document.querySelector("#addClass");
    let studentForm = document.querySelector("#addStudent");
    let listForm = document.querySelector("#studentList");
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
        addClassToDom();
    })

    listForm.addEventListener("submit", (e) => {
        e.preventDefault();
        checkBoxChange();

    })

    studentForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let className = document.querySelector("#class").value;
        let studentName = document.querySelector("#studentName").value;
        let age = document.querySelector("#age").value;
        let city = document.querySelector("#city").value;
        let grade = document.querySelector("#grade").value;
        let container = document.querySelector("#addStudentDiv");
        let p = document.createElement("p");
        let 
        try {
            let res = await axios.post(`http://localhost:3000/class/${className}/enroll`, {
                className,
                studentName,
                age,
                city,
                grade
            })
            return res;
        } catch (err) {
            console.log(err)
        }
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
        // console.log(res)
        return res; 
    } catch (error) {
        console.log(error);
    }
}

const addClassToDom = async () => {
    data = await addClass();
    console.log(data.data['class']);
    
    let container = document.querySelector("#addClassDiv");

    let newClass = document.createElement("div");
    newClass.id = 'newClass';
    let className = document.createElement("p");
    let teacherName = document.createElement("p");
    
    className.innerText = data.data.class.name;
    teacherName.innerText = data.data.class.teacher;

    newClass.append(className,teacherName);

    container.append(newClass);
}

const checkBoxChange = () => {
    let check = document.querySelector("#checkbox");
    let classList = document.querySelector("#classList").value;
    let cityList = document.querySelector("#cityList").value;
    check.addEventListener("change", async () => {
        // console.log(check.checked);
        try {
            let res = await axios.get("http://localhost:3000/class");
            let result = [];
            let allClasses = res.data.allClasses.classList; 
            console.log(allClasses);
            allClasses.forEach(el => {
                if (el.toLowerCase() === classList.toLowerCase()) {
                    el['students'].forEach(student => {
                        if (student.city === cityList && student.grade < 70) {
                            result.push(student);
                        }
                        return result;
                    })
                }
            })
        } catch (err) {
            console.log(err)
        }
    })
    return check.checked;
}