const addClass = async () => {
    let className = document.querySelector("#className").value;
    let teacher = document.querySelector("#teacher").value;
    axios.post("http://localhost:3000/addClass", {className, teacher});
    className = ""
    teacher = ""
}

const enrollStudent = async () => {
    let addClass = document.querySelector("#addClass").value;
    let name = document.querySelector("#name"). value;
    let age = document.querySelector("#age").value;
    let city = document.querySelector("#city").value;
    let grade = document.querySelector("#grade").value;
    axios.post(`http://localhost:3000/enrollStudent/:${addClass}`, {name, age, city, grade});
    addClass.innerHTML = " "
    name.innerHTML = " "
    age.innerHTML = ""
    city.innerHTML = ""
    grade.innerHTML = ""
}

const listStudent = async () => {
    let sclass = document.querySelector("#sclass").value;
    let scity = document.querySelector("#scity").value;
    try {
        let res = await axios.get("http://localhost:3000/listStudents")

    } catch (err) {
        console.log(err)
    }
}