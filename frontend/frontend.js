document.addEventListener("DOMContentLoaded", () => {
    let form1 = document.querySelector("#form1");
    let form2 = document.querySelector("#form2");
    let form3 = document.querySelector("#form3");
    let submit1 = document.querySelector("#submit1");
    let submit2 = document.querySelector("#submit2");
    let submit3 = document.querySelector("#submit3");
    let addClassName = document.querySelector("#class");
    let addTeacher = document.querySelector("#teacher");
    let sClass = document.querySelector("#sclass");
    let sName = document.querySelector("#sname");
    let sAge = document.querySelector("#sage");
    let sCity = document.querySelector("#scity");
    let sGrade = document.querySelector("#sgrade");
    let aClass = document.querySelector("#aclass");
    let aCity = document.querySelector("#acity");
    let failing = document.querySelector("#failing");
    let ul = document.querySelector("ul")

    //Take inputs to send to routes to create a class
    const addClass = (className, teacher) => {
        ul.innerHTML = "";
        axios.post(`http://localhost:3000/class`, {
               name: className,
               teacher: teacher,
               student: []
            })
            let h2 = document.createElement("h2");
            h2.innerHTML = `${className} was added`;
            ul.appendChild(h2);
        }

    const addStudent = (className, name, age, city, grade) => {
        ul.innerHTML = "";
        axios.post(`http://localhost:3000/class/${className}/enroll`, {
                name: name,
                city: city,
                age: age,
                grade: grade
            })
            let h2 = document.createElement("h2");
            h2.innerHTML = `${name} was added to ${className}`;
            ul.appendChild(h2);
        }

    const printStudents = async (className, city, failing) => {
        //if city is blank it is === ""
        //if failing is not clicked false or other wise
        let list = await axios.get(`http://localhost:3000/class/${className}/students`);
        ul.innerHTML = "";
        if(city != "" && failing === true){
            let h2 = document.createElement("h2");
            h2.innerHTML = `${className} students from ${city} and failing`;
            ul.appendChild(h2);
            for(let i = 0; i < list.data.length; i ++){
                if(list.data[i]["city"] === city && list.data[i]["grade"] < 70){
                    let li = document.createElement("li");
                    li.innerHTML = `Name: ${list.data[i]["name"]} Age: ${list.data[i]["age"]} City: ${list.data[i]["city"]} Grade: ${list.data[i]["grade"]}`;
                    ul.appendChild(li);
                }
            }
        } else if(city != "" && failing === false){
            let h2 = document.createElement("h2");
            h2.innerHTML = `${className} students from ${city}`;
            ul.appendChild(h2);
            for(let i = 0; i < list.data.length; i ++){
                if(list.data[i]["city"] === city){
                    let li = document.createElement("li");
                    li.innerHTML = `Name: ${list.data[i]["name"]} Age: ${list.data[i]["age"]} City: ${list.data[i]["city"]} Grade: ${list.data[i]["grade"]}`;
                    ul.appendChild(li);
                }
            }
        } else if(city === "" && failing === true){
            let h2 = document.createElement("h2");
            ul.appendChild(h2);
            h2.innerHTML = `Failing ${className} students`;
            for(let i = 0; i < list.data.length; i ++){
                if(list.data[i]["grade"] < 70){
                    let li = document.createElement("li");
                    li.innerHTML = `Name: ${list.data[i]["name"]} Age: ${list.data[i]["age"]} City: ${list.data[i]["city"]} Grade: ${list.data[i]["grade"]}`;
                    ul.appendChild(li);
                }
            }
        } else {
            let h2 = document.createElement("h2");
            h2.innerHTML = `${className} students`;
            ul.appendChild(h2);
            for(let i = 0; i < list.data.length; i ++){
                let li = document.createElement("li");
                li.innerHTML = `Name: ${list.data[i]["name"]} Age: ${list.data[i]["age"]} City: ${list.data[i]["city"]} Grade: ${list.data[i]["grade"]}`;
                ul.appendChild(li);
            }
        }
    }

    //Adds a class and puts it in the backend
    form1.addEventListener("submit", async (e) => {
        e.preventDefault();
        addClass(addClassName.value, addTeacher.value);
        window.alert('The class was added');
    })

    //Adds a student to be enrolled in a class
    form2.addEventListener("submit", async (e) => {
        e.preventDefault();
        addStudent(sClass.value, sName.value, sAge.value, sCity.value, sGrade.value);
        window.alert('Student was enrolled');
    })

    //Shows all students
    form3.addEventListener("submit", async (e) => {
        e.preventDefault();
        printStudents(aClass.value, aCity.value, failing.checked);
    })
    
})