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
    let form3 = document.querySelector("#three")
    let div1 = document.querySelector("#divOne")
    let div3 = document.querySelector("#three")

    form1.addEventListener("submit", (e) => {
        e.preventDefault();
        try { 
        axios.post(`http://localhost:3000/route/class/${className.value}/${teacherName.value}`).then(res => {
            let p = document.createElement("p");
            let newClass = className.value.charAt(0).toUpperCase() + className.value.slice(1)
            let teacher = teacherName.value.charAt(0).toUpperCase() + teacherName.value.slice(1)
            p.innerText = `Teacher: ${teacher} : Class: ${newClass}` 
            div1.appendChild(p)
            debugger
            }) 
        }catch(err){
            console.log(err)
        }
        
    }) 

    // studentSubmit.addEventListener("Submit", (e) => {
    //     e.preventDefault();

    // })

    form3.addEventListener("submit", (e) => {
        e.preventDefault();
        try{
            axios.get(`http://localhost:3000/route/${classList.value}/students`).then(res => {
                let name = res.data.name
                let students = res.data.students
                let p = document.querySelector("p");
                p.innerText = `Class: ${name}, Student List: ${students}`
                div3.appendChild(p)
                debugger
                
            })
        }catch(err){
            console.log(err)
        }
    })


    

})