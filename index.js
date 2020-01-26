document.addEventListener("DOMContentLoaded", () => {
    let course = document.querySelector("#course")
    let teacher = document.querySelector('#teacher')
    let submitClass = document.querySelector('#submitClass')
    let addClass = document.querySelector('#addClass')
    let className = document.querySelector("#className")
    let studentName = document.querySelector('#studentName')
    let city = document.querySelector('#city')
    let age = document.querySelector("#age")
    let grade = document.querySelector("#grade")
    let enroll = document.querySelector('#enroll')
    
    const add_class = (name, teacher) => {
        axios.post('http://localhost:3000/class', {
            //let res = res.data 
            name: name,
            teacher: teacher
        })
          //debugger;
    }
    const enroll_student = (studentName,city,age,grade) => {
        axios.post('http://localhost:3000/class/:className/enroll', {
            className: course,
            student: studentName,
            city: city,
            age: age,
            grade: grade 

        })
    }

    addClass.addEventListener('submit', async (e) => {
        e.preventDefault()
        course.innerHTML = ""
        teacher.innertext =""

        // let ul = document.createElement('ul')
        // let li = document.createElement('li')
        add_class(course.value , teacher.value)

       // req.body.appendchild(req.body)

    })
    enroll.addEventListener('submit', async(e) => {
        e.preventDefault()
        enroll_student(studentName.value, city.value, age.value, grade.value)
    

    })

})


