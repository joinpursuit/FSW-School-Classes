let classForm = document.querySelector("#addClass");
let studentForm = document.querySelector("#addStudent");
let select = document.querySelector('#class');
let listForm = document.querySelector("#studentList");
let allClassesBtn = document.querySelector("#allClasses");
let showAllClasses = document.querySelector("#showAllClasses");
let p = document.createElement("p");
showAllClasses.appendChild(p);

const getClasses = async () => {
    try {
        let res = await axios.get("http://localhost:3000/class");
        let classes = res.data.allClasses;
        console.log(classes)
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
        let res = await axios.get("http://localhost:3000/class");
        let allClasses = JSON.stringify(res.data.allClasses);
        p.innerHTML = allClasses;
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
})

listForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let check = document.querySelector("#checkbox").checked;
    console.log(check);
    
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
    let snp = document.createElement("p");
    let ap = document.createElement("p");
    let cp = document.createElement("p");
    let gp = document.createElement("p");
    // cnp.innerText = className;
    snp.innerText = studentName;
    ap.innerText = age;
    cp.innerText = city;
    gp.innerText = grade;
    container.append(snp, ap, cp, gp);
    
console.log('in the formjhfjyfjytf');


    try {
        console.log('in the try', className);
        
        let res = await axios.post(`http://localhost:3000/class/${className}/enroll`, {
            className,
            studentName,
            age,
            city,
            grade
        })
        console.log('adding student',res);
        
        let p = document.createElement("p");
        p.innerText = JSON.stringify(res.data);
        container.appendChild(p);
    } catch (err) {
        console.log('in the catch');
        // debugger
        console.log(err)
    }
})


const populateSelect = (className) => {
    let option = document.createElement("option");
    option.innerText = className;
    console.log('new class option=>', option )
    select.appendChild(option);
}

const addClass = async () => {
    try {
        let name = document.querySelector("#className").value;
        let teacher = document.querySelector("#teacherName").value;
        let res = await axios.post("http://localhost:3000/class", {
            name,
            teacher
        });  
        console.log('THis is res=> ',res)
        populateSelect(name);
        return res; 
    } catch (error) {
        console.log(error);
    }
}

const addClassToDom = async () => {
    data = await addClass();
    console.log(data);
    
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

const checkBoxChange = async (check) => {
    let classList = document.querySelector("#classList").value;
    let cityList = document.querySelector("#cityList").value;
        // console.log(check.checked);
        console.log(check)
        try {
            let res = await axios.get(`http://localhost:3000/class/${classList}/students/?failing=${check}&city=${cityList}`);
            console.log(res);
            console.log('this is allClasses', res.data.allClasses);
            console.log(res);
        
            let result = [];
            let allClasses = res.data.allClasses[classList]; 
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
    // return check.checked;
}