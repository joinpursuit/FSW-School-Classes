document.addEventListener("DOMContentLoaded", () => {
    let class_ = document.querySelector("#class_")
    let teacher_ = document.querySelector('#teacher')
    let submitClass = document.querySelector('#submitClass')
    
    const add_class = (name, teacher) => {
         axios.post('http://localhost:3000/class')
        let res = res.data 
        name: name
        teacher: teacher

        
    }

    submitClass.addEventListener('submit', async (e) => {
        e.preventDefault()
        let ul = document.createElement('ul')
        let li = document.createElement('li')
        add_class(class_.value, teacher_.value)

    })
})