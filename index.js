const listClasses = async()=>{
    try{
        //let select = document.querySelector("#select")
        let res = await axios.get("http://localhost:7000/class")
        let classes = res.data.classes
        let select = document.querySelector("#select")
        Object.values(classes).forEach(values=>{
            //debugger
            let option = document.createElement("option")
            option.innerText=values.name
            select.appendChild(option)
        })
               
        
    }catch(err){
        console.log(err)
    }
}
listClasses()

const addClass = async()=>{
    try{
        let form= document.querySelector("form")
        form.addEventListener("submit",async(event)=>{
            event.preventDefault()
            let classes = document.querySelector("#classes")
            let teacher = document.querySelector("#teacher")
            await axios.post("http://localhost:7000/class",{name:classes.value, teacher:teacher.value})
            let select = document.querySelector("#select")
            //debugger
            let option = document.createElement("option")
            option.innerText = classes.value
            select.appendChild(option)


        })
        
    }catch(err){
        console.log(err)
    }
}
addClass()

const addStudent = async() =>{
    try{
        let form2 = document.querySelector("#form2")
        form2.addEventListener("submit",async(event)=>{
            event.preventDefault()
            let name = document.querySelector("#name")
            let age = document.querySelector("#age")
            let city = document.querySelector("#city")
            let grade = document.querySelector("#grade")
            debugger
            await axios.post("http://localhost:7000/class/add", {name:name.value, age:age.value, city:city.value, grade:grade.value})
            let ul = document.querySelector("ul")
            let li = document.createElement("li")
            li.innerText = name.value
            ul.appendChild(li)
        })

    }catch(err){
        console.log(err)
    }
    addStudent()




}
    