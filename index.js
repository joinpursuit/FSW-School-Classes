document.addEventListener("DOMContentLoaded", () => {

    let className = document.querySelector("#className");
    let teacherName = document.querySelector("#teacherName");
    let addClass = document.querySelector("#addClass");
    let studentClass = document.querySelector("#studentClass");
    let studentName = document.querySelector("#studentName");
    let studentAge = document.querySelector("#studentAge");
    let studenCity = document.querySelector("#studentCity");
    let studentGrade = document.querySelector("#studentGrade");
    let studentSubmit = document.querySelector("#studentSubmit");
    let classList = document.querySelector("#classList");
    let cityList = document.querySelector("#cityList");
    let checkFailing = document.querySelector("#checkFailing");
    let listSubmit = document.querySelector("#listSubmit")
    let form1 = document.querySelector("#one")
    let div1 = document.querySelector("#divOne")

    form1.addEventListener("submit", (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/route/${className.value}/${teacherName.value}`).then(res => {
            let p = document.createElement("p");
            let newClass = className.value
            let teacher = teacherName.value
            p.innerText = `Teacher: ${teacher} : Class: ${newClass}` 
            div1.appendChild(p)
            debugger
            }) 
        
    }) 

    // studentSubmit.addEventListener("Submit", (e) => {
    //     e.preventDefault();

    // })

})