
let url="http://localhost:3000/school";
let school="";
document.addEventListener("DOMContentLoaded", async() => {
    school = await axios.get(url+"/");
    classOpt(school.data)
    
    let schoolBtn = document.querySelector("#showAllClasses")
    schoolBtn.addEventListener("click",async(el)=>{
        document.getElementById("showing").hidden=false
        let newSchool = await axios.get(url+"/");
        show(newSchool.data)
    }
    )
    schoolBtn.addEventListener("dblclick",()=>{
    document.getElementById("showing").hidden=true
    })
    
    let addClass = document.querySelector("#addClass")
    
    let nameClass=document.querySelector("#name");
    let teacherName=document.querySelector("#teacher");
    addClass.addEventListener("submit",async(el)=>{
        el.preventDefault();
        let addClass =await axios.post(url+`/add/class/?name=${nameClass.value}&teacher=${teacherName.value}`)
        console.log(addClass.data)
        school = await axios.get(url+"/");
        classOpt(school.data)
        nameClass.value="";
        teacherName.value="";
        // debugger
    });
    
    
    let enroll=document.querySelector("#addStudent")
    enroll.addEventListener("submit",async(el)=>{
        el.preventDefault();
        let addStudent =await axios.post(`http://localhost:3000/school/add/student/${el.target.elements[0].value}`, {name: el.target.elements[1].value, age: el.target.elements[2].value, city:el.target.elements[3].value, grade:el.target.elements[4].value})
        console.log(addStudent.data)
    }
    )
    
    let showStudent=document.querySelector("#studentList")
    showStudent.addEventListener("click",async(el)=>{
        document.getElementById("showingStudent").hidden=false;
        school = await axios.get(url+"/");
        showStudentList(school.data,el.target.form.elements[0].value,el.target.form.elements[1].selectedOptions[0].value)
    })
    showStudent.addEventListener("dblclick",()=>{
        document.getElementById("showingStudent").hidden=true
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
    document.getElementById("showing").innerHTML=""
    let element = "";
    for (let key in data){
        element+="<p>"+ key +": "+ data[key].teacher+"</p>";
        for(let el of data[key].students){
            element+="<p>"+"student: ["+el.name+ ", age: "+ el.age+", city :"+el.city+", grade :"+el.grade+"] </p>"
        }
        document.getElementById("showing").innerHTML=element
    }
}

const showStudentList = (data,classSel,grade="")=>{
    if(!grade){
        document.getElementById("showingStudent").innerHTML=""
        let element = "";
        for(let el of data[classSel].students){
            element+="<p>"+"student: ["+el.name+ ", age: "+ el.age+", city :"+el.city+", grade :"+el.grade+"] </p>"
        }
        document.getElementById("showingStudent").innerHTML=element
    }else{
        document.getElementById("showingStudent").innerHTML=""
        let element = "";
        data[classSel].students.forEach(student=>{
            if(student.grade===grade){
                    element+="<p>"+"student: ["+student.name+ ", age: "+ student.age+", city :"+student.city+", grade :"+student.grade+"] </p>"
                document.getElementById("showingStudent").innerHTML=element
            }
        })
    }
}