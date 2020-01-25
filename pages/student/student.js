let ids = JSON.parse(sessionStorage.getItem("ids"));
let student = ids[2];

document.addEventListener("DOMContentLoaded", () => {
    fetchData("http://localhost:3000/classes", populateSelect);

    let enrollForm = document.querySelector("#enrollForm");
    let updateForm = document.querySelector("#updateForm");

    enrollForm.addEventListener("submit", (e) => {
        e.preventDefault();
        enrollStudent();
    })

    updateForm.addEventListener("submit", (e) => {
        e.preventDefault()
        updateStudent()
    })
}) // End of DOMContentLoaded

const fetchData = async (url, callback) => {
    try {
        let res = await axios.get(url);
        callback(res.data);
    } catch(err) {
        console.log(err);
    }
} // End of fetchData() function

const populateSelect = async (data) => {
    let classSelect = document.querySelector("#enrollClass");
    let classes = data.classes;
    classes.forEach(foundClass => {
        let option = document.createElement("option");
        let {class_name, first_name, last_name} = foundClass;
        option.value = foundClass.id;
        option.innerHTML = `<b>Class</b>: ${class_name} <b>Teacher</b>: ${first_name} ${last_name}`
        classSelect.appendChild(option);
    })
} // End of populateSelect() function


const enrollStudent = async () => {
    let classSelect = document.querySelector("#enrollClass");
    let enrollResponse = document.querySelector("#enrollResponse");
    
    if(classSelect.value === "disbaled") {
        enrollResponse.innerHTML = "";
        let error = document.createElement("p");
        error.innerText = "Please select a class to enroll into";
        enrollResponse.appendChild(error);
    } else {
        let res = await axios.post(`http://localhost:3000/classes/${classSelect.value}/students/${student}`);
        debugger;
    }
} // End of enrollStudent() function

const updateStudent = () => {
    
} // End of updateStudent() function