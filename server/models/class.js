/*
Joseph P. Pasaoa
Class model | Express Server Project
*/


class Class {
  constructor(name, teacher) {
    this.name = name;
    this.teacher = teacher;
    this.students = [];
  }
}

module.exports = Class;
