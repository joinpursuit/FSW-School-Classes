document.addEventListener("DOMContentLoaded",()=>{


   
 
let headerspan = document.querySelector(".headerspan")
let adlist = document.querySelector("#adlist")
let evlist = document.querySelector("#evlist")
let calist = document.querySelector("#calist")
let melist = document.querySelector("#melist")

let findname = document.querySelector("#findname")

findname.addEventListener("click",()=>{



  axios.get("http://localhost:3000/query").then(res=>{
console.log(Object.values(res.data[0]))
let allInfo = Object.values(res.data[0])
console.log(allInfo[2])
let name = document.querySelector("#name")
name.innerText = "Name: " + allInfo[2]
let enrollment = document.querySelector("#enrollment")
enrollment.innerText = "Enrollment Date: 4/9/2000"

let gpa = document.querySelector("#gpa")
gpa.innerText = "GPA: " + allInfo[4]
let city = document.querySelector("#city")
city.innerText = "City: " + allInfo[3]
















  })
  





})

})
