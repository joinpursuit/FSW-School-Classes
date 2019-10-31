/*
Joseph P. Pasaoa
Class model | Express Server Project
*/


class Class {
  constructor(className, teacherName) {
    this.name = className;
    this.teacher = teacherName;
    this.students = [];
  }
}

module.exports = Class;
