document.addEventListener("DOMContentLoaded", () => {
    // let classForm = document.querySelector("#addClass");
    // let studentForm = document.querySelector("#addStudent");
    // let listForm = document.querySelector("#studentList");
    let allClassesBtn = document.querySelector("#allClasses");
    allClassesBtn.addEventListener("click", async () => {
        let showAllClasses = document.querySelector("#showAllClasses");
        let p = document.createElement("p");
        showAllClasses.appendChild(p);
        try {
            let res = await axios.get("http://localhost:3000/class");
            let allClasses = JSON.stringify(res.data.allClasses);
            p.innerHTML = allClasses;
        } catch (error) {
            console.log(error);
        }
    })
})