const Class = require("./Class")
const Student = require("./Student")

class School {
  constructor() {
    this.classes = {}
    //   this.classes = {
    //     physics1: {
    //       name: "physics1",
    //       teacher: "mr.stkurdiknmibalz",
    //       students: [
    //         {
    //           name: "stan marsh",
    //           city: "south park",
    //           age: 7,
    //           grade: 70
    //         },
    //         {
    //           name: "eric cartman",
    //           city: "south park",
    //           age: 7,
    //           grade: 60
    //         },
    //         {
    //           name: "kenny mccormick",
    //           city: "south park",
    //           age: 8,
    //           grade: 100
    //         },
    //         {
    //           name: "leopold stoch",
    //           city: "south park",
    //           age: 7,
    //           grade: 75
    //         },
    //         {
    //           name: "wendy testaburger",
    //           city: "south park",
    //           age: 7,
    //           grade: 99
    //         },
    //         {
    //           name: "kirk brovloski",
    //           city: "south park",
    //           age: 9,
    //           grade: 99
    //         }
    //       ]
    //     }
    //   }
  }

  addClass(name, teacher) {
    let newClass = new Class(name, teacher)
    this.classes[name] = newClass
  }

  /**
   * Enroll student in class
   *
   * @param
   * {string} className - Name of the class
   * @param
   * {Student} student - Student object
   * @return {Student} Enrolled student
   */
  enrollStudent(className, stdnt) {
    // this.classes[className].students.push(stdnt)
    this.classes[className].addStudent(stdnt)
    return stdnt
  }

  /**
   * Get all students enrolled in a class
   *
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    return this.classes[className].students
  }

  /**
   * Get all students and apply filters. If failing = true
   * return all students that are failing the class,
   * that is all students whose grade is less than 70.
   *
   *
   * If a city is passed return students whose city match
   * the city passed. If both failing and city are passed
   * return students that are failing and that live in the
   * specified city
   *
   * @param {string} className - Name of the class
   * @param {boolean} failing - Whether to return students that are failing the class or not
   * @param {string} city - Name of the city to match against students
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClassWithFilter(className, failing, city) {
    // Your code here
    let arr = mySchool.classes[className].students
    if (city !== undefined) {
      arr = arr.filter(s => s.city === city)
    }
    if (failing !== undefined && failing === "true") {
      arr = arr.filter(s => s.grade < 70)
    }
    return arr
  }
}

let mySchool = new School()

// console.log(mySchool.addClass("art", "danny"))

module.exports = mySchool
