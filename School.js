const Class = require("./Class")
const Student = require("./Student")

class School {
  constructor() {
    this.classes = {
      physics1: {
        name: "physics1",
        teacher: "mr.stkrdiknmibalz",
        students: [
          {
            name: "stan marsh",
            city: "south park",
            age: 7,
            grade: 70
          },
          {
            name: "eric cartman",
            city: "south park",
            age: 7,
            grade: 60
          },
          {
            name: "kenny mccormick",
            city: "south park",
            age: 8,
            grade: 100
          },
          {
            name: "leopold stoch",
            city: "south park",
            age: 7,
            grade: 75
          },
          {
            name: "wendy testaburger",
            city: "south park",
            age: 7,
            grade: 99
          },
          {
            name: "kirk brovloski",
            city: "south park",
            age: 9,
            grade: 99
          }
        ]
      }
    }
  }

  addClass(name, teacher) {
    let newClass = new Class(name, teacher)
    this.classes[name] = newClass
    return newClass
  }

  enrollStudent(className, stdnt) {
    this.classes[className].addStudent(stdnt)
    return stdnt
  }

  getStudentsByClass(className) {
    return this.classes[className].students
  }

  getStudentsByClassWithFilter(className, failing, city) {
    // Your code here
    let arr = mySchool.classes[className].students
    console.log(arr)
    if (city) {
      arr = arr.filter(s => s.city === city)
      console.log(s.city)
    }
    if (failing !== undefined && failing === "true") {
      arr = arr.filter(s => s.grade < 70)
    }
    return arr
  }

  //the following code attemps to grab student array by city:

  getStudentsByCity(city) {
    console.log(city)
    let studentByCityArr = []
    for (let className in this.classes) {
      // for (let students in className) {
      className.students.forEach(student => {
        if (student.city === city) {
          studentByCityArr.push(student)
        }
      })
      // }
    }
    return studentByCityArr
    // className.students[0].city
  }
}

let mySchool = new School()

module.exports = mySchool 
