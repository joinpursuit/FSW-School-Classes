const listClasses = async()=>{
    try{
        //let select = document.querySelector("#select")
        let res = await axios.get("http://localhost:7000/class")
        let classes = res.data.classes
        let select = document.querySelector("#select")
        Object.values(classes).forEach(values=>{
            let option = document.createElement("options")
            option.values=values.name
            debugger
            select.appendChild(option)
        })
               
        
    }catch(err){
        console.log(err)
    }
}
listClasses()

const form = document.querySelector("form")
form.addEventListener("submit", async(event)=>{
    event.preventDefault()
    let name = document.querySelector("#name")
    let age = document.querySelector("#age")
    let city = document.querySelector("#city")
    let grade = document.querySelector("#grade")
    await axios.post("http://localhost:7000/class/add",{name:name.value, age: age.value, city: city.value, grade:grade.value})
    name.value = ""
    age.value= ""
    city.value = ""
    age.value = ""
})