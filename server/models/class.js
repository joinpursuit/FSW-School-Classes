/*
Joseph P. Pasaoa
Class model | Express Server Project
*/


/* HELPERS */
const addZero = (component, targetLength) => {
  while (component.toString().length < targetLength) {
    component = "0" + component;
  }
  return component;
}
const customizeDate = (d) => {
  let output = `${addZero(d.getFullYear(), 4)}, ${addZero(d.getMonth() + 1, 2)}/${addZero(d.getDate(), 2)}`;
  output += ` ${addZero(d.getHours(), 2)}:${addZero(d.getMinutes(), 2)}:${addZero(d.getSeconds(), 2)}`;
  return output;
}



class Class {
  constructor(className, teacherName, time) {
    this.name = className;
    this.teacher = teacherName;
    this.students = [];
    this.timeCreated = customizeDate(new Date());
  }
}

module.exports = Class;
