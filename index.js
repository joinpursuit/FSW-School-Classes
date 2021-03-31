document.addEventListener("DOMContentLoaded",async()=>{

  




//       const optionChoice = async()=>{
//             axios.get(`http://localhost:3000/query/specialsearch`).then(res=>{
//                   let allInfo = res.data
//             allInfo.forEach((el)=>{
//                   let option = document.createElement("option")
//                   option.value = "test"
//                   option.innerText = el.name
//                   console.log(option.value)
//                   let select = document.querySelector("select")
//                   select.appendChild(option)
//                })
//           })
               
//       }
// optionChoice()








let findname = document.querySelector("#findname")
findname.addEventListener("click",async()=>{
      axios.get(`http://localhost:3000/query/search/${nameinput.value}`).then(res=>{
            console.log(res.data)
            let studentInfo = res.data
            let name = document.querySelector("#name")
            name.innerText = studentInfo.name
            let dob = document.querySelector("#dob")
            dob.innerText = studentInfo.dob
            let city = document.querySelector("#city")
            city.innerText = studentInfo.city
            let gpa = document.querySelector("#gpa")
            gpa.innerText = studentInfo.gpa
      })
})












    
    
      
   

































         



//---------












//--------------









})
