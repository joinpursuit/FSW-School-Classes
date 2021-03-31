
let formOne = document.querySelector("#addClass");
let formTwo = document.querySelector("#addStudent")
let h3 = document.querySelector("#addClassHead");
console.log("hello")
formOne.addEventListener("submit", async (e)=>{
    e.preventDefault();
    let className = document.querySelector("#className");
    let teacherClass = document.querySelector("#teacherClass");

    try{
        let res = await axios.post("http://localhost:3000/class",{
            name: className.value,
            teacher: teacherClass.value
        });
        debugger
        className.value = "";
        teacherClass.value = "";
        h3.innerText = `${res.data.class.name} + ${res.data.class.teacher}`
        
    }catch(err){
        debugger;
        h3.innerText = ""
        h3.innerText = err.response.data.error + err.response.data.timestamp;

    }
})

formTwo.addEventListener("submit", async (e)=>{
    e.preventDefault();
    let stuClass = document.querySelector("#stuClass");
    let stuName = document.querySelector("#stuName");
    let stuAge = document.querySelector("#stuAge");
    let stuCity = document.querySelector("#stuCity");
    let stuGrade = document.querySelector("#stuGrade");

    try{
        let res = await axios.post(`http://localhost:3000/class/${stuClass.value}/enroll`,{
            name: stuName.value,
            age: stuAge.value,
            city: stuCity.value,
            grade: stuGrade.value
        })
        debugger
    }catch(err){
        debugger
    }

})
