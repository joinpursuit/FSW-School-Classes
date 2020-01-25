document.addEventListener("DOMContentLoaded",()=>{


   
 
let headerspan = document.querySelector(".headerspan")
let adlist = document.querySelector("#adlist")
let evlist = document.querySelector("#evlist")
let calist = document.querySelector("#calist")
let melist = document.querySelector("#melist")

let findname = document.querySelector("#findname")
findname.addEventListener("click",()=>{ 
      axios.get(`http://localhost:3000/query/search/${nameinput.value}`).then(res=>{
            let allinfo = res.data 
            let studentinfo = Object.values(allinfo)
           console.log(studentinfo)
      if (studentinfo.length < 3){
            fail.innerText = "No Match Found"
      }else{   
            let name = document.querySelector("#name")
            name.innerText = "Name: " + studentinfo[2]
            let enrollment = document.querySelector("#enrollment")
            enrollment.innerText = "Enrollment Date: 4/9/2000"
            let gpa = document.querySelector("#gpa")
            gpa.innerText = "GPA: " + studentinfo[4]
            let city = document.querySelector("#city")
            city.innerText = "City: " + studentinfo[3]
            let dob = document.querySelector("#dob")
            dob.innerText = "dob: " + studentinfo[5]
          }            
     }) 
}) 

//---------


let findsub = document.querySelector("#findsub")
findsub.addEventListener("click",()=>{ 
      let subjectin = document.querySelector("#subjectin")  
      axios.get(`http://localhost:3000/query/subject/${subjectin.value}`).then(res=>{
            let infosub = res.data 
            console.log(infosub)
            let subject = document.querySelector("#subject")
            subject.innerText = infosub.class + " class Roster: " + infosub.roster
                 
     }) 
}) 

//--------------

let postinfo = document.querySelector("#postinfo")
postinfo.addEventListener("submit",()=>{ 
        axios.post(`http://localhost:3000/query/input/`, {name: namepost.value,age:agepost.value, city:citypost.value}) .then(res=>{
            let infosub = res.data 
            console.log(infosub)
            let subject = document.querySelector("#subject")
            subject.innerText = infosub.class + " class Roster: " + infosub.roster
                 
     }) 
}) 








//--------------









})
