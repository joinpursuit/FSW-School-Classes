document.addEventListener("DOMContentLoaded", () => {
    
    let button =  document.querySelector("#allClassesButton") 
    
    button.addEventListener("click", async () => {
        let data = await axios.get("http://localhost:3000/classes")
        debugger
    })

    document.body.appendChild(button)
})