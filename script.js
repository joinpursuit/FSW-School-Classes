document.addEventListener('DOMContentLoaded', () => {
    console.log('Script working!')
    document.querySelector('#add-class-btn').addEventListener('click', addClass);
    document.querySelector('#add-student-btn').addEventListener('click', addStudent);
    document.querySelector('#list-student-btn').addEventListener('click', listStudent);
})

const serverURL = `http://localhost:8000`;

// Helper function to get value of any node by it's ID
const getValueFrom = (id) => document.querySelector(`#${id}`).value; 

const addClass = async () => {
    console.log('Adding Class...');
    const jsonData = {
        name: getValueFrom('class-name'),
        teacher: getValueFrom('teacher')
    }
    console.log("jsonData", jsonData)

    const data = await axios.post(`http://localhost:8000/class`, jsonData)

    addClassDisplay(data); // Notify the user of the status of adding a class
}

// Helper functions to Hide/Show notifcation and the Message based on if it was a success or an error
const showNotification = (id) => document.querySelector(`#${id}`).style.display = 'block';

const hideNotification = (id) => {
    const displayClass = document.querySelector(`#${id}`);
    displayClass.style.display = 'none';
    displayClass.innerText = '';
}

const displayMsg = (id, text, bgColor) => {
    const displayClass = document.querySelector(`#${id}`);
    displayClass.innerText = text;
    displayClass.style.backgroundColor = bgColor;
}
// Combined helper functions into one function called notification
const notify = (id, msg, color, time = 1250) => {
    showNotification(id);
    displayMsg(id, msg, color);
    setTimeout(hideNotification, time, id);
}

// Display notifcation when client attempts to add a class (Success or Error)
const addClassDisplay = (data) => {
    data.data.error ? notify('display-class', data.data.error, 'red') : notify('display-class', data.data.message, 'green');
    console.log("data.data", data.data);
}

// Returns an object with all the values from Student form
const getStudentFormData = () => {
    return {
        className: getValueFrom('class'),
        name: getValueFrom('name'),
        age: getValueFrom('age'),
        city: getValueFrom('city'),
        grade: getValueFrom('grade')
    }
};

const getListStudentFormData = () => {
    return {
        className: getValueFrom('class-query'),
        cityQuery: getValueFrom('city-query'),
        failing: getValueFrom('failing')
    }
}

const addStudent = async () => {
    const {className, name, age, city, grade} = getStudentFormData();

    if (className == '' || name == '' || age == '' || city =='' || grade == '') {
        return notify('display-add', 'Please fill out all fields in order to add the Student!', 'red');
    }
    if (checkValidNumbers(parseFloat(grade), parseInt(age))) {
        console.log('Not Valid');
        return;
    }

    const data = await axios.post(`http://localhost:8000/class/${className}/enroll`, {name, age, city, grade});
    data.data.error ? notify('display-add', data.data.error, 'red') : notify('display-add', data.data.message, 'green');
    console.log(data.data);
}

const checkValidNumbers = (grade, age) => {
    let invalidGrade = false;
    let invalidAge = false;
    
    if (isNaN(grade) || grade < 0 || grade > 100)  {
        notify('display-add', 'Please enter a valid grade between 0 - 100', 'red');
        invalidGrade = true;
    }
    if (isNaN(age) || age < 0 || age > 100)  {
        notify('display-add', 'Please enter a valid age between 0 - 100', 'red')
        invalidAge = true;
    }
    return invalidGrade || invalidAge;
}

const displayStudentResponse = (data) => {
    const ul = document.querySelector('#student-list');
    ul.innerHTML = '';

    if (data.error) {
        notify('display-students', data.error, 'red');
    } else if (!data.students.length) {
        notify('display-students', 'There are 0 students that matches those criterias.', 'red');
    } else {
        data.students.forEach(ele => {
            const li = document.createElement('li');
            li.innerText = `Name: ${ele.name} Age: ${ele.age} City:  ${ele.city} Grade:  ${ele.grade}`;
            document.querySelector('#student-list').appendChild(li);
        })
    }
}

const listStudent = async () => {
    const {className, cityQuery} = getListStudentFormData();
    const failing = document.querySelector('#failing').checked;
    console.log('City Query: ', cityQuery);

    if (className === '') {
        showNotification('display-students');
        displayMsg('display-students',  'Please write the name of the class you want to search in.', 'red');
        setTimeout(hideNotification, 1500, 'display-students');
        return;
    }

    // let data = '';
    if (cityQuery) {
        const data = await axios.get(`http://localhost:8000/class/${className}/students?city=${cityQuery}&failing=${failing}`);
        console.log(data.data);
        return displayStudentResponse(data.data);
    } else {
        const data = await axios.get(`http://localhost:8000/class/${className}/students?failing=${failing}`);
        console.log(data.data);
        return displayStudentResponse(data.data);
    }
}

// API LINK to get randomuser information