document.addEventListener('DOMContentLoaded', () => {
  let addBtn = document.querySelector('#addClass')
  addBtn.addEventListener('click', addClass)
  let addBtn1 = document.querySelector('#studBtn')
  addBtn1.addEventListener('click', addStudent)
  let addBtn2 = document.querySelector('#listBtn')
  addBtn2.addEventListener('click', listStudent)
})
async function addClass(e) {
  e.preventDefault()
  let className = document.querySelector('#className').value
  let teacher = document.querySelector('#teacher').value
  let response = document.querySelector('#addClassResp')

  let result = await axios.post('http://localhost:8080/class', {
    name: className, teacher: teacher
  })

  response.innerText = JSON.stringify(result.data)

}

async function addStudent(e) {
  e.preventDefault()
  let info = document.getElementsByClassName('student')
  let response = document.querySelector('#addStudentResp')

  let result = await axios.post(`http://localhost:8080/class/${info[0].value}/enroll`, {
    name: info[1].value,
    age: info[2].value,
    city: info[3].value,
    grade: info[4].value
  })

  response.innerText = JSON.stringify(result.data)

}

async function listStudent(e) {
  e.preventDefault()
  let response = document.querySelector('#ListResp')
  let class1 = document.querySelector('#class').value
  let city = document.querySelector('#city').value
  let checkBox = document.querySelector('#fail').checked

  let result = await axios.get(`http://localhost:8080/class/${class1}/students?city=${city}&failing=${checkBox}`)


  response.innerText = JSON.stringify(result.data)

}