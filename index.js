document.addEventListener('DOMContentLoaded', () => {
    setupForm1();
    setupForm2();
  })

  const setupForm1 = () => {
    let form = document.getElementById('classAdd')
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      addClass();
    })
  }

  const setupForm2 = () => {
    let form2 = document.getElementById('studentAdd')
    form2.addEventListener('submit', (event) => {
      event.preventDefault();
      enrollStudent();
    })
  }

  const grabClassData = () => {

      let name = document.querySelector('input[name="name"]').value
      let teacher = document.querySelector('input[name="teacher"]').value

          // Grab the data from the input fields and fill this object with it
    let classData = {
        name: name,
        teacher: teacher
      }

      return classData;
  }

  const grabStudentData = () => {

    let name = document.querySelector('input[name="name"]').value
    let city = document.querySelector('input[name="city"]').value
    let age = document.querySelector('input[name="age"]').value
    let grade = document.querySelector('input[name="grade"]').value

        // Grab the data from the input fields and fill this object with it

  let studentData = {
      name: name,
      city: city,
      age: age,
      grade: grade
    }
    return studentData;
}
  
  const addClass = async () => {
    let url = 'http://localhost:1337/Class'
  
    // name, teacher
  
    let newClass = grabClassData()
    // console.log(newClass)

    try {
      let response = await axios.post(url, newClass)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const enrollStudent = async () => {
    let url = 'http://localhost:1337/class/:className/enroll'
  
    // name, teacher
  
    let newStudent = grabStudentData()
    console.log(newStudent)

    try {
      let response = await axios.post(url, newStudent)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  