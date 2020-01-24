document.addEventListener("DOMContentLoaded", () => {
   let classEntry = document.querySelector("#classEntry");
   classEntry.addEventListener("submit", addClass);
})

const addClass = async (e) => {
   e.preventDefault()
   let className = document.querySelector("#className")
   let inputClassName = className.value
   let teacherName = document.querySelector("#teacher")
   let inputTeacherName = teacherName.value
   
   try {
      let returnEntry = await ("http://localhost:4000/class", {name: inputClassName, teacher: inputTeacherName})
      debugger

   } catch (err) {
      console.log(err)
   }
}