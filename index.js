
let url="http://localhost:3000/school";
let school="";
document.addEventListener("DOMContentLoaded", async() => {
    school = await axios.get(url+"/");
    classOpt(school.data)
    
    let schoolBtn = document.querySelector("#showAllClasses")
    schoolBtn.addEventListener("click",async()=>{
        let newSchool = await axios.get(url+"/");
        show(newSchool.data)
    })
    
    let addClass = document.querySelector("#addClass")
    
    addClass.addEventListener("submit",async(el)=>{
        el.preventDefault();
        let name=el.target.elements[0].title;
        let nameClass=el.target.elements[0].value;
        let teacher=el.target.elements[1].title;
        let teacherName=el.target.elements[1].value;
        let addClass =await axios.post(url+"/add/class/?"+name+`=`+nameClass+`&`+`${teacher}=`+teacherName)
        console.log(addClass.data)
        school = await axios.get(url+"/");
        classOpt(school.data)
    });
    

    let enroll=document.querySelector("#addStudent")
    enroll.addEventListener("submit",async(el)=>{
        el.preventDefault();
        await axios.post(`http://localhost:3000/school/add/student/${el.target.elements[0].value}`, {name: el.target.elements[1].value, age: el.target.elements[2].value, city:el.target.elements[3].value, grade:el.target.elements[4].value})
    }
    )
    
    let showStudent=document.querySelector("#showStudent")
    showStudent.addEventListener("submit",async(el)=>{
        el.preventDefault();
        showStudentList(school.data,el.target.elements[0].value)
    })

})


const classOpt = (list)=>{
    let classesList=document.querySelector("#classList")
    let classesList2=document.querySelector("#classList2")
    classesList2.innerHTML="";
    classesList.innerHTML="";
    for(let key in list){
       let classesOption=document.createElement("option")
       classesOption.value=list[key].name;
       classesOption.innerText=list[key].name;
       classesList.appendChild(classesOption);
    };

    for(let key in list){
       let classesOption=document.createElement("option")
       classesOption.value=list[key].name 
       classesOption.innerText=list[key].name 
       classesList2.appendChild(classesOption)
    }
}

const show = (data)=>{
    let element = "";
    for (let key in data){
        element+="<p>"+ key +": "+ data[key].teacher+"</p>";
        for(let el of data[key].students){
            element+="<p>"+"student: ["+el.name+ ", age: "+ el.age+", city :"+el.city+", grade :"+el.grade+"] </p>"
        }
    document.getElementById("showing").innerHTML=""
    document.getElementById("showing").innerHTML=element
}
}
const showStudentList = (data,classSel)=>{
    let element = "";
        for(let el of data[classSel].students){
            element+="<p>"+"student: ["+el.name+ ", age: "+ el.age+", city :"+el.city+", grade :"+el.grade+"] </p>"
        }
    document.getElementById("showingStudent").innerHTML=element
}