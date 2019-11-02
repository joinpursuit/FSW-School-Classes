document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded')

  let form1 = document.getElementById('1')
  let p1 = document.getElementById('p1')
  let form2 = document.getElementById('2')
  let p2 = document.getElementById('p2')
  let form3 = document.getElementById('3')
  let p3 = document.getElementById('p3')
  let checkbox = document.getElementById('checkbox')

  const form1Handler = () => {
    let name = document.getElementById('class-name').value
    let teacher = document.getElementById('teacher').value
    let url = 'http://localhost:3030/class'
    let body = {
      name: name,
      teacher: teacher
    }
    axios.post(url, body)
    .then(response => {
      p1.innerText = response.data.message
    })
  }

  const form2Handler = () => {
    let classname = document.getElementById('class').value
    let name = document.getElementById('name').value
    let age = document.getElementById('age').value
    let city = document.getElementById('city').value
    let grade = document.getElementById('grade').value
    let url = `http://localhost:3030/class/${classname}/enroll`
    let body = {
      name: name,
      age: age,
      city: city,
      grade: grade
    }
    axios.post(url, body)
    .then(response => {
      p2.innerText = response.data.message
    })
  }

  const form3Handler = () => {
    let classname = document.getElementById('class-student').value
    let url =''
    if (checkbox.checked === true) {
      url = `http://localhost:3030/class/${classname}/students/?failing=true`
    } else {
      url = `http://localhost:3030/class/${classname}/students`
    }
    axios.get(url)
    .then(response => {
      p3.innerText = response.data.message
    })
  }

  form1.addEventListener('submit', (event) => {
    event.preventDefault()
    form1Handler()
  })

  form2.addEventListener('submit', (event) => {
    event.preventDefault()
    form2Handler()
  })

  form3.addEventListener('submit', (event) => {
    event.preventDefault()
    form3Handler()
  })
})
