document.addEventListener('DOMContentLoaded', () => {
    console.log('Script working!')
    document.querySelector('#add-class-btn').addEventListener('click', addClass)
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
    // console.log(name, teacher);

    // const data = await axios({
    //     method: 'post',
    //     url: 'http://localhost:8000/class',
    //     body: jsonData,
    //     headers: {"Content-Type": "application/json"},
    //     params: {
    //         a: 1
    //     }
    // });

    const data = await axios.post(`http://localhost:8000/class`, jsonData)

    console.log("data.data", data.data);
}

const addStudent = async (e) => {
    e.preventDefault();
    const className = document.querySelector('#class').value;
    const name = document.querySelector('#name').value;
    const age = document.querySelector('#age').value;
    const city = document.querySelector('#city').value;
    const grade = document.querySelector('#grade').value;

    const jsonData = {
        name,
        age,
        city,
        grade
    }

    const data = await axios.post(`http://localhost:8000/class/${className}/enroll`, jsonData);
    console.log(data.data)
}

const listStudent = (e) => {
    e.preventDefault();
    const className = document.querySelector('#class-query').value;
    const cityQuery = document.querySelector('#city-query').value;
    const failing = document.querySelector('#failing').checked;
    console.log(cityQuery)

    let data; 
    if (cityQuery) {
        data = axios.get(`http://localhost:8000/class/${className}/students?city=${cityQuery}&failing=${failing}`);
    } else {
        data = axios.get(`http://localhost:8000/class/${className}/students?failing=${failing}`);
    }
    
    console.log(data.data);
}