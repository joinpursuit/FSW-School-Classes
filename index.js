let classFrm = document.querySelector("#addClass")
let enrollFrm = document.querySelector("#addStudent")
let searchFrm = document.querySelector("#listStudents")

const addClass = async (event) => {
    event.preventDefault();
    let className = document.querySelector("#className").value;
    let teacher = document.querySelector("#teacher").value;
    axios.post("http://localhost:3000/class", {className, teacher});
    className.innerHTML = " ";
    teacher.innerHTML = " ";
}

const enrollStudent = async (event) => {
    event.preventDefault();
    let addClass = document.querySelector("#addClass").value;
    let name = document.querySelector("#name"). value;
    let age = document.querySelector("#age").value;
    let city = document.querySelector("#city").value;
    let grade = document.querySelector("#grade").value;
    try {
        axios.post(`http://localhost:3000/class/:${addClass}/enroll`, {name, age, city, grade});
        addClass.innerHTML = " ";
        name.innerHTML = " ";
        age.innerHTML = " ";
        city.innerHTML = " ";
        grade.innerHTML = " ";
    } catch(err) {
        console.log(err)
    }
}

const listStudent = async (event) => {
    event.preventDefault();
    let sclass = document.querySelector("#sclass").value;
    let scity = document.querySelector("#scity").value;
    try {
        let res = await axios.get(`http://localhost:3000/class/:${sclass}/students`);
        
    } catch (err) {
        console.log(err)
    }
}

classFrm.addEventListener("submit", addClass);
enrollFrm.addEventListener("submit", enrollStudent);
searchFrm.addEventListener("submit", listStudent);