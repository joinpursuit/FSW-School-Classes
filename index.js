document.addEventListener("DOMContentLoaded", () => {
    let displayCoursesbtn = document.querySelector("#displayCourses")
    displayCoursesbtn.addEventListener("click", async () => {
        try {
            let res = await axios.get(`http://localhost:3000/course`)
            let allCoursesObj = JSON.stringify(res.data.allCourses)
            let courses = document.createElement("p")
            let coursesDiv = document.querySelector("#coursesDiv")
            coursesDiv.appendChild(courses)
            courses.innerText = allCoursesObj
        } catch (error) {
            console.log(error)
        }
    })

    document.addEventListener("DOMContentLoaded", () => {
        let enrollStudent = document.querySelector("#course")
        try {
            let res = await axios.get(`http://localhost:3000/student`)
        } catch (error) {
            
        }
    })

    











})

