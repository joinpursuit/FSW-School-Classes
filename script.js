document.addEventListener('DOMContentLoaded', () => {
    console.log('Script working!')
    document.querySelector('#add-class-btn').addEventListener('click', addClass);
    document.querySelector('#add-student-btn').addEventListener('click', addStudent);
    document.querySelector('#list-student-btn').addEventListener('click', listStudent);
})

const test = () => {
    console.log('Test')
}

const serverURL = `http://localhost:8000`;

const addClass = async (e) => {
    // e.preventDefault();
    console.log('Add Class');
    const name = document.querySelector('#class-name').value;
    const teacher = document.querySelector('#teacher').value;
    const jsonData = {
        name,
        teacher
    }
    console.log("jsonData", jsonData)

    const data = await axios.post(`http://localhost:8000/class`, jsonData)

    addClassDisplay(data); // Notify the user of the status of adding a class
}

const addClassDisplay = (data) => {
    const displayClass = document.querySelector('#display-class');
    displayClass.style.display = 'block';
    displayClass.innerText = '';

    if (data.data.error) {
        displayClass.innerText = data.data.error;
        displayClass.style.backgroundColor = 'red';
    } else {
        displayClass.innerText = data.data.message;
        displayClass.style.backgroundColor = 'green';

    }
    console.log("data.data", data.data);
}

const addStudent = async (e) => {
    e.preventDefault();

    const className = document.querySelector('#class').value;
    const name = document.querySelector('#name').value;
    const age = document.querySelector('#age').value;
    const city = document.querySelector('#city').value;
    const grade = document.querySelector('#grade').value;

    const displayAdd = document.querySelector('#display-add');
    displayAdd.style.display = 'block';
    displayAdd.innerText = '';

    if (className == '' || name == '' || age == '' || city =='' || grade == '') {
        displayAdd.innerText = 'Please fill out all fields in order to add the Student!';
        displayAdd.style.backgroundColor = 'red';
        return;
    }

    const parseGrade = parseFloat(grade);
    const parseAge = parseInt(age);

    const valid = checkValidNumbers(parseGrade, parseAge);

    if (valid) {
        return;
    }

    const jsonData = {
        name,
        age,
        city,
        grade
    }

    const data = await axios.post(`http://localhost:8000/class/${className}/enroll`, jsonData);

    if (data.data.error) {
        displayAdd.innerText = data.data.error;
        displayAdd.style.backgroundColor = 'red';
    } else {
        displayAdd.innerText = data.data.message;
        displayAdd.style.backgroundColor = 'green';
    }

    console.log(data.data)
}

const checkValidNumbers = (grade, age) => {
    const displayAdd = document.querySelector('#display-add');
    let gradeBool = false;
    let ageBool = false;
    if (isNaN(grade) || grade < 0 || grade > 100)  {
        displayAdd.innerText = 'Please enter a valid grade between 0 - 100';
        displayAdd.style.backgroundColor = 'red';
        gradeBool = true;
    }
    if (isNaN(age) || age < 0 || age > 100)  {
        displayAdd.innerText = 'Please enter a valid age between 0 - 100';
        displayAdd.style.backgroundColor = 'red';
        ageBool = true;
    }
    return gradeBool && ageBool;
}

const displayStudentResponse = (data) => {
    const displayStudents = document.querySelector('#display-students');
    displayStudents.style.display = 'block';
    displayStudents.innerText = '';

    const ul = document.querySelector('#student-list');
    ul.innerHTML = '';

    if (!data.students) {
        displayStudents.innerText = 'There are 0 students that matches those criterias.';
        displayStudents.style.backgroundColor = 'red';
    } else {
        displayStudents.style.display = 'none';
        data.students.forEach(ele => {
            const li = document.createElement('li');
            li.innerText = `${ele.name} ${ele.age} ${ele.city} ${ele.grade}`;
            ul.appendChild(li)
        })
    }
}

const listStudent = async (e) => {
    e.preventDefault();
    const className = document.querySelector('#class-query').value;
    const cityQuery = document.querySelector('#city-query').value;
    const failing = document.querySelector('#failing').checked;
    console.log('City Query: ', cityQuery);

    const displayStudents = document.querySelector('#display-students');
    displayStudents.style.display = 'block';
    displayStudents.innerText = '';

    if (className === '') {
        displayStudents.innerText = 'Please write the name of the class you want to search in.'
        displayStudents.style.backgroundColor = 'red';
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

    // data = data.data;
    // console.log(data)

    // displayStudentResponse(data);

    // const ul = document.querySelector('#student-list');
    // ul.innerHTML = '';

    // if (!data.students) {
    //     displayStudents.innerText = 'There are 0 students that matches those criterias.';
    //     displayStudents.style.backgroundColor = 'red';
    // } else {
    //     displayStudents.style.display = 'none';
    //     data.students.forEach(ele => {
    //         const li = document.createElement('li');
    //         li.innerText = `${ele.name} ${ele.age} ${ele.city} ${ele.grade}`;
    //         ul.appendChild(li)
    //     })
    // }
}

// API LINK to get randomuser information