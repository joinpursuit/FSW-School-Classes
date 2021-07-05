let classForm = document.querySelector("#addClass");
let studentForm = document.querySelector("#addStudent");
let select = document.querySelector('#class');
let listForm = document.querySelector("#studentList");
let allClassesBtn = document.querySelector("#allClasses");
let showAllClasses = document.querySelector("#showAllClasses");
let allClass = document.createElement("p");
showAllClasses.appendChild(allClass);

const getClasses = async () => {
    try {
        let res = await axios.get("http://localhost:3000/class");
        let classes = res.data.allClasses;
        // console.log(classes)
        for (let key in classes) {
            let option = document.createElement("option");
            option.innerText = key;
            select.appendChild(option);
        }
    } catch (err) {
        console.log(err)
    }

}
getClasses();
allClassesBtn.addEventListener("click", async () => {
    try {
        allClass.innerHTML = "";
        let res = await axios.get("http://localhost:3000/class");
        console.log(res.data.allClasses)
        // debugger;
        // let allClasses = JSON.stringify(res.data.allClasses);
        let allClasses = res.data.allClasses;
        for (let key in allClasses) {
            let classes = allClasses[key];
            let className = document.createElement("p");
            let teacherName = document.createElement("p");
            className.innerText = classes.name;
            className.id = "nameOfClass";
            teacherName.innerText = classes.teacher;
            teacherName.id ="professor"
            allClass.append(className, teacherName);
            let students = classes.students;
            students.forEach(student => {
                let p = document.createElement("p");
                p.id = "students";
                p.innerText = student.name;
                allClass.appendChild(p);
            })
            // p.innerHTML = allClasses;
        }
            // if (!p.innerHTML) {
            // } else {
            //     p.innerHTML = "";
            //     p.innerHTML = allClasses;
            // }
    } catch (error) {
        console.log(error);
    }
})

classForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addClassToDom();
    document.querySelector("#className").value = "";
    document.querySelector("#teacherName").value = "";
})

listForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let check = document.querySelector("#checkbox").checked;
    // console.log(check);
    
    checkBoxChange(check);

})

studentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let className = document.querySelector("#class").value;
    let studentName = document.querySelector("#studentName").value;
    let age = document.querySelector("#age").value;
    let city = document.querySelector("#city").value;
    let grade = document.querySelector("#grade").value;
    let container = document.querySelector("#addStudentDiv");
    // let cnp = document.createElement("p");
    // let snp = document.createElement("p");
    // let ap = document.createElement("p");
    // let cp = document.createElement("p");
    // let gp = document.createElement("p");
    // // cnp.innerText = className;
    // snp.innerText = studentName;
    // ap.innerText = age;
    // cp.innerText = city;
    // gp.innerText = grade;
    // container.append(snp, ap, cp, gp);
    try {
        let { data} = await axios.post(`http://localhost:3000/class/${className}/enroll`, {
            className,
            studentName,
            age,
            city,
            grade
        })
        // console.log('adding student',res);
        let p = document.createElement("p");
        // p.innerText = JSON.stringify(res.data);
        // console.log(res.data)
        console.log("add student", data)
        if (data.student) {
            p.innerText = `${data.timestamp}: Enrolled ${data.student.name} in ${data.className}`;
            
        } else {
            p.innerText = `${data.timestamp}: ${data.error}`
        }
        container.appendChild(p);
        document.querySelector("#studentName").value = "";
        document.querySelector("#age").value = "";
        document.querySelector("#city").value = "";
        document.querySelector("#grade").value = "";
        
    } catch (err) {
        // console.log('in the catch');
        // debugger
        console.log(err)
        // res.status(400).json({
        //     status: "error",
        //     message: "Student already exists"
        // })
    }
})

const clearInputs = () => {

}

const populateSelect = (className) => {
    if (className) {
        let option = document.createElement("option");
        option.innerText = className;
        select.appendChild(option);
    } else {
        console.log("Class already added!");
    }
}


const addClass = async () => {
    try {
        let name = document.querySelector("#className").value;
        let teacher = document.querySelector("#teacherName").value;
        let {data:data} = await axios.post("http://localhost:3000/class", {
            name,
            teacher
        });  
        // console.log('THis is res=> ',data)
        // populateSelect(name);
        // console.log('add class ',res)
        // checkClass();
        return data; 
    } catch (error) {
        console.log(error);
    }
}

let className = document.querySelector("#className");
let teacherName = document.querySelector("#teacherName");
const addClassToDom = async () => {
    data = await addClass();
    // console.log(data);
    let container = document.querySelector("#addClassDiv");



    let newClass = document.createElement("div");
    newClass.id = 'newClass';
    
    let addedClass = document.createElement("p");
    addedClass.id = "addedClass";
    
    if (data.error) {
        newClass.innerText = `${data.timestamp}: ${data.error}`;
    } else {
        addedClass.innerText = `${data.timestamp}: ${data.message}, ${data.class.name} with ${data.class.teacher}`;
        newClass.append(addedClass);
        populateSelect(data.class.name);
    }
    container.append(newClass);

}

const checkBoxChange = async (check) => {
    let classList = document.querySelector("#classList").value;
    let cityList = document.querySelector("#cityList").value;
    let studentList = document.querySelector("#listOfStudents");
        try {
            let res = await axios.get(`http://localhost:3000/class/${classList}/students?failing=${check}&city=${cityList}`);

            let allStudents = res.data.students 
            // console.log(res.data.students);
            studentList.innerHTML = "";
            allStudents.forEach(student => {
                let li = document.createElement("li");
                li.id = "studentList";
                li.innerText = student.name;
                studentList.appendChild(li);
            })
            document.querySelector("#classList").value = "";
            document.querySelector("#cityList").value = "";
            return allClasses
            
            // allClasses.forEach(el => {
            //     if (el === classList) {
            //         el['students'].forEach(student => {
            //             if (student.city === cityList && student.grade < 70) {
            //                 result.push(student);
            //             }
            //             return result;
            //         })
            //     }
            // })
        } catch (err) {
            console.log(err)
        }
    // return check.checked;
}