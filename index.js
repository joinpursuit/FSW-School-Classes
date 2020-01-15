
let url="http://localhost:3000/school"
let school=""

let schoolBtn = document.querySelector("#showAllClasses")
schoolBtn.addEventListener("click",async()=>{
    let school = await axios.get(url+"/")
    show(school.data)
    classOpt(school.data)
})

let addClass = document.querySelector("#addClass")

addClass.addEventListener("submit",async(el)=>{
    el.preventDefault();
    let name=el.target.elements[0].title;
    let nameClass=el.target.elements[0].value
    let teacher=el.target.elements[1].title;
    let teacherName=el.target.elements[1].value;
    // http://localhost:3000/school/add/class/?name=Math&teacher=Kim S&student=[]
    let add = await axios.post(url+"/add/class/?"+name+`=`+nameClass+`&`+`${teacher}=`+teacherName)
});

const classOpt = (list)=>{
    let classesList=document.querySelector("#classList")
    for(let key in list){
        debugger
       let classesOption=document.createElement("option")
       classesOption.value=list[key].name 
       classesOption.innerText=list[key].name 
       classesList.appendChild(classesOption)
    }

}

let enroll=document.querySelector("#addStudent")
enroll.addEventListener("submit",async(el)=>{
    el.preventDefault()
    console.log(enroll)
})





const show = (data)=>{
    let element = "";
    for (let key in data){
        // debugger
        element+="<p>"+ key +": "+ data[key].teacher+"</p>";
        for(let el of data[key].students){
            // debugger;
            element+="<p>"+"student: ["+el.name+ ", age: "+ el.age+", city :"+el.city+", grade :"+el.grade+"] </p>"
            // console.log(el)
        }
        document.getElementById("showing").innerHTML=element
}
}