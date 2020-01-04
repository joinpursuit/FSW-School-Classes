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

  let classname = document.querySelector('input[name="class-name"]').value
  let studentname = document.querySelector('input[name="studentname"]').value
  let city = document.querySelector('input[name="city"]').value
  let age = document.querySelector('input[name="age"]').value
  let grade = document.querySelector('input[name="grade"]').value
  // let newClass = grabClassData()

  // Grab the data from the input fields and fill this object with it

  let studentData = {
    name: classname,
    studentname: studentname,
    city: city,
    age: age,
    grade: grade
  }
  console.log('See all Students', studentData)

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
    let newClassInfo = response.data
    displayClassInfo([newClassInfo])
  } catch (err) {
    console.log(err)
  }
}

const enrollStudent = async () => {
  let url = 'http://localhost:1337/class/:className/enroll'

  // name, teacher

  let newStudent = grabStudentData()
  // console.log(newStudent)

  try {
    let response = await axios.post(url, newStudent)
    console.log(response.data)
    let newStudentInfo = response.data
    displayStudentInfo([newStudentInfo])
  } catch (err) {
    console.log(err)
  }
}

const printStudentsInClass = async () => {
  let url = 'http://localhost:1337/Classes'
}

displayAllStudentsInClass = (students) => {
  const ul = document.getElementById('student-info')

  students.forEach(scholar => {
    let li = document.createElement('li')
    li.innerText = `${scholar.className} - ${scholar.student.studentname} - ${scholar.student.city} - ${scholar.student.age} - ${scholar.student.grade} - ${scholar.message} - ${scholar.timestamp}`
    ul.appendChild(li);
  })
}

displayClassInfo = (classes) => {
  const ul = document.getElementById('class-info')

  classes.forEach(classElective => {
    let li = document.createElement('li')
    li.innerText = `${classElective.class.name} - ${classElective.class.teacher} - ${classElective.message} - ${classElective.timestamp}`
    ul.appendChild(li);
  })

}

displayStudentInfo = (students) => {
  const ul = document.getElementById('student-info')
  ul.innerText = '';

  students.forEach(scholar => {
    let li = document.createElement('li')
    li.innerText = `${scholar.className} - ${scholar.student.studentname} - ${scholar.student.city} - ${scholar.student.age} - ${scholar.student.grade} - ${scholar.message} - ${scholar.timestamp}`
    ul.appendChild(li);
  })
}
