document.addEventListener("DOMContentLoaded", () => {
    let course = document.querySelector("#course")
    let teacher = document.querySelector('#teacher')
    let submitClass = document.querySelector('#submitClass')
    let addClass = document.querySelector('#addClass')
    
    const add_class = (name, teacher) => {
        axios.post('http://localhost:3000/class', {
            //let res = res.data 
            name: name,
            teacher: teacher
        })
        
        
        debugger;
    }

    addClass.addEventListener('submit', async (e) => {
        e.preventDefault()
        let ul = document.createElement('ul')
        let li = document.createElement('li')
        add_class(course.value , teacher.value)
        debugger
        req.body.appendchild(req.body)

    })
})