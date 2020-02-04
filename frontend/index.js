
let formOne = document.querySelector("#addClass");
let h3 = document.querySelector("#addClassHead")
formOne.addEventListener("submit", async (e)=>{
    e.preventDefault();
    let className = document.querySelector("#className");
    let teacherClass = document.querySelector("#teacherClass");

    try{
        let res = await axios.post("http://localhost:3000/class",{
            class: className.value,
            teacher: teacherClass.value
        });
        debugger
        className.value = "";
        teacherClass.value = "";
        h3.innerText = res.data.message;
        
    }catch(err){
        h3.innerText = err.responce.data.message;
        debugger;
    }
})