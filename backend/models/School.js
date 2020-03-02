const Class = require('../models/Class');
const Student = require('../models/Student')

class School {
  constructor() {
    this.classes = {
      // className: Class Object
      //   physics: {} 
    }
  }


// class School {
//   constructor() {
// this.classes = {
//   Transfigurations: 
//         {name: 'Transfigurations',
//         teacher: 'Ms. Minerva McGonagall',
//         students:[{name: "Harry Potter", age: 22, city: "Godric Hallows", grade: 86.5, house: "Gryffindor"}, {name: "Penelope Clearwater", age: 23, city: "Oxford", grade: 79.0, house: "Ravenclaw"}, {name: "Ronald Weasley", age: 22, city: "Newcastle", grade: 88.5, house: "Gryffindor"},  {name: "Susan Bones", age: 23, city: "London", grade: 89.0, house: "Hufflepuff"}]}
//     }
//   }


  // class Student {
  //   constructor(name, age, city, grade) {
  //     this.name = name
  //     this.city = city
  //     this.age = age
  //     this.grade = grade
        //  this.house = house
  //   }
  // }
  


  // this.classes = {
  //   className: 
  //         {name: 'Transfigurations',
  //         teacher: 'Ms. Minerva McGonagall',
  //         students:[{name: "Harry Potter", age: 22, city: "Godric Hallows", grade: 86.5, house: "Gryffindor"}, {name: "Penelope Clearwater", age: 23, city: "Oxford", grade: 79.0, house: "Ravenclaw"}, {name: "Ronald Weasley", age: 22, city: "Newcastle", grade: 88.5, house: "Gryffindor"},  {name: "Susan Bones", age: 23, city: "London", grade: 89.0, house: "Hufflepuff"}]}
  //     }






  //   {
  //     Charms: 
  //         {name: 'Charms',
  //         teacher: 'Mr. Filius Flitwick',
  //         students:[{name: "Millicent Bulstrode", age: 23, city: "Birmingham", grade: 81.0, house: "Slytherin"}, {name: "Terry Boot", age: 24, city: "Manchester", grade: 65.1, house: "Ravenclaw"}, {name: "Zacharias Smith", age: 23, city: "Chester", grade: 86.5, house: "Gryffindor"}]
  //         }
  
  // }


  //   this.classes = {
  //     { Transfigurations:  
  //       {
  //       name: 'Transfigurations',
  //       teacher: 'Ms. Minerva McGonagall',
  //       students:[{name: "Harry Potter", age: 22, city: "Godric Hallows", grade: 86.5, house: "Gryffindor"}, {name: "Penelope Clearwater", age: 23, city: "Oxford", grade: 79.0, house: "Ravenclaw"}, {name: "Ronald Weasley", age: 22, city: "Newcastle", grade: 88.5, house: "Gryffindor"},  {name: "Susan Bones", age: 23, city: "London", grade: 89.0, house: "Hufflepuff"}]
  //     }
  //   }, 

  //   {
  //     Charms: 
  //     {
  //       name: 'Charms',
  //       teacher: 'Mr. Filius Flitwick',
  //       students:[{name: "Millicent Bulstrode", age: 23, city: "Birmingham", grade: 81.0, house: "Slytherin"}, {name: "Terry Boot", age: 24, city: "Manchester", grade: 65.1, house: "Ravenclaw"}, {name: "Zacharias Smith", age: 23, city: "Chester", grade: 86.5, house: "Gryffindor"}]
  //     }
  //   },

  //   {
  //     DefenseAgainstTheDarkArts:
  //     {
  //       name: 'Defense Against the Dark Arts',
  //       teacher: 'Mr. Remus Lupin',
  //       students:[{name: "Justin Finch-Fletchley", age: 23, city: "Croydon", grade: 68.5, house: "Hufflepuff"}, {name: "Chidera Manke", age: 23, city: "Nottingham", grade: 88.5, house: "Gryffindor"}, {name: "Hermione Granger", age: 22, city: "Liverpool", grade: 97.9, house: "Gryffindor"}, {name: "Padma Patil", age: 23, city: "Exeter", grade: 81.7, house: "Ravenclaw"}]
  //     }
  //   },

  //   {
  //     Potions: 
  //     {
  //       name: 'Potions',
  //       teacher: 'Mr. Severus Snape',
  //       students:[{name: "Itoro Uko", age: 25, city: "Houston", grade: 98.1, house: "Gryffindor"}, {name: "Gregory Goyle", age: 24, city: "Cambridge", grade: 61.3, house: "Slytherin"}, {name: "Lisa Turpin", age: 23, city: "Bristol", grade: 90.2, house: "Ravenclaw"}]
  //     }
  //   },

  //   {
  //     Herbology:
  //     {
  //       name: 'Herbology',
  //       teacher: 'Ms. Pomona Sprout',
  //       students:[{name: "Luna Lovegood", age: 22, city: "Wembley", grade: 80.0, house: "Ravenclaw"}, {name: "Draco Malfoy", age: 22, city: "Winchester", grade: 64, house: "Slytherin"}, {name: "Hannah Abbott", age: 23, city: "Wembley", grade: 61.9, house: "Hufflepuff"}]
  //     }
  //   }

  
  //   }
  // };


  /**
   * Add class to classes
   * 
   * @param {string} name - Name of the class
   * @param {string} teacher - Name of instructor 
   * @return {Class} Class object
   */

  addClass(name, teacher) {
    let newClass = new Class(name, teacher);
    this.classes[name] = newClass;
    return newClass
  }

  /**
   * Enroll student in class
   * 
   * @param {string} className - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  
  enrollStudent(className, student) {
    let newStudent = new Student(student.name, student.city, student.age, student.grade, student.house)
    this.classes[className]["students"].push(newStudent); 
    return newStudent
  }



  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    return this.classes[`${className}`]["students"];
  }

  /**
   * Get all students and apply filters. If failing = true
   * return all students that are failing the class, 
   * that is all students whose grade is less than 70.
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
    let students = this.classes[`${className}`]["students"]
    if (failing && city){
      return students.filter((student) => {
        return (student.grade < 70) && (student.city === city)
      })
    } else if (city){
      return students.filter((student) => {
        return student.city === city
      }) 
    } else if (failing){
      return students.filter((student) => {
        return student.grade < 70
      })
    }
  }
}

module.exports = School;
