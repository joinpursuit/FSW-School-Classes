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
        appendEnrollResponse(res.data);
    }
} // End of enrollStudent() function

const appendEnrollResponse = (data) => {
    let enrollResponse = document.querySelector("#enrollResponse")
    enrollResponse.innerHTML = "";
    if(data.error) {
        let error = document.createElement("p");
        error.innerText = data.error;
        enrollResponse.appendChild(error);
    } else {
        let message = document.createElement("p");
        message.innerText = `Enrolled in class ${data.className}`;
        enrollResponse.appendChild(message);
    }
} // End of appendEnrollResponse() function

const updateStudent = async () => {
    let updateFirst = document.querySelector("#updateFirst");
    let updateLast = document.querySelector("#updateLast");
    let updateCity = document.querySelector("#updateCity");
    let updateAge = document.querySelector("#updateAge");

    let firstName = updateFirst.value;
    let lastName = updateLast.value;
    let age = updateAge.value;
    let city = updateCity.value;

    if(firstName || lastName || age || city) {
        let updates = [];
        if(firstName) updates.push(await axios.patch(`http://localhost:3000/students/${student}?firstName=${firstName}`));
        if(lastName) updates.push(await axios.patch(`http://localhost:3000/students/${student}?lastName=${lastName}`));
        if(age) updates.push(await axios.patch(`http://localhost:3000/students/${student}?age=${age}`));
        if(city) updates.push(await axios.patch(`http://localhost:3000/students/${student}?city=${city}`));
            
        appendUpdateResponse(updates);
    } else {
        let updateResponse = document.querySelector("#updateResponse");
        updateResponse.innerHTML = "";
        let error = document.createElement("p");
        error.innerText = "Nothing to update";
        updateResponse.appendChild(error);
    }
    
} // End of updateStudent() function

const appendUpdateResponse = (updateData) => {
    let updateResponse = document.querySelector("#updateResponse");
    updateResponse.innerHTML = "";
    let updates = updateData;

    if(updates[0].data.updated.id) {
        let updateUl = document.createElement("ul");
        updates.forEach((update, i) => {
            if(update === updates[updates.length - 1]) {
                let student = update.data.updated;
                let {id, first_name, last_name, city, age} = student;
                let updatedStudent = document.createElement("p");
                updatedStudent.innerHTML = `<b>Student ID</b>: ${id} <b>First Name</b>: ${first_name} <b>Last Name</b>: ${last_name} <b>City</b>: ${city} <b>Age</b>: ${age}`;
                updateResponse.appendChild(updatedStudent);
            }
            let li = document.createElement("li");
            li.innerText = update.data.message;
            updateUl.appendChild(li);
        })

        updateResponse.appendChild(updateUl);
    } else {
        let error = document.createElement("p");
        error.innerText = "No student found by that ID";
        updateResponse.appendChild(error);
    }
} // End of appendUpdateStudent() function