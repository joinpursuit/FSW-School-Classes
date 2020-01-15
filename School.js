
// const express = require("express");
// const newSchool=express.Router();
const Class = require('./Class.js');
const Student = require('./Student.js')


// classes: {
//   Math: { teacher: 'John Doe', students: [Array] },
//   English: { teacher: 'Jane Doe', students: [Array] },
//   Gym: Class { name: 'Gym', teacher: 'Brad', students: [] }
// }
class School {
  constructor() {
    this.classes = {
      // Math:{"teacher": "John Doe", "students":[{name:"Kim",age:12,city:"CHI",grade:"fail"},{name:"Rachel",age:17,city:"NYC",grade:"pass"}]},
      English:{"teacher": "Jane Doe", "students":[{name:"Leo",age:17,city:"NYC",grade:"n/a"}]}
      // className: Class Object
      //   physics: {} 
    }
  }
  
  
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
  }
  
  /**
   * Enroll student in class
   * 
   * @param {string} className - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  enrollStudent(className, student) {
    // Your code here
  }

  
  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    // Your code here
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
    // Your code here
  }
  
}


// let newSchool = new School ()
// newSchool.addClass("Gym","Brad")
// console.log(newSchool)





module.exports = School;

// newSchool.get("/",(req,res)=>{
//   // new Class({"name": "Physics", "teacher": "Henry Roman", "students":[]});
//   // new Student({ "name": "John", "age": 30, "city": "NYC", "grade": 75 });
//   res.json(schoolOne.classes)
// })

// newSchool.post("/add/class",(req,res)=>{
//   let classOne = new Class(req.query.name, req.query.teacher, req.query.student)
//   schoolOne.classes[req.query.name]=req.query
//   res.json(classOne)
// })

// newSchool.get(`/class`,(req,res)=>{
//   res.json(studentOne)
// })
// newSchool.post("/add/className/student",(req,res)=>{
//   let studentOne = new Student(req.query.name,req.query.age,req.query.city,req.query.grade);
//   console.log(studentOne)
//   schoolOne.classes[req.query.className].student+=(studentOne)
//   res.json(studentOne)
// })
// enrollStudent(className, student) {
//   // Your code here
// }


// class School{
//   constructor(){
//     this.classes={
//       "hell":1,
//       "hello":2,
//     }
//   }
  
//   addClass(name, teacher) {
//     let newClass = new Class(name, teacher);
//     this.classes[name] = newClass;
//   }
  
  
  
// }
// let schoolOne = new School()
