document.addEventListener("DOMContentLoaded", () => {
   let classEntry = document.querySelector("#classEntry");
   classEntry.addEventListener("submit", addClass);
})

const addClass = async (e) => {
   e.preventDefault()
   let className = document.querySelector("#className").value
   let teacherName = document.querySelector("#teacher").value
   let displayClass = document.querySelector("#classPrint")
   try {
      let result = await axios.post("http://localhost:4000/class", { name: className, teacher: teacherName })


      displayClass.innerText = `${className}: name: ${result.data.class.name},  teacher: ${result.data.class.teacher}`

   } catch (err) {
      console.log(err)
   }
   className = "";
   teacherName = "";
}