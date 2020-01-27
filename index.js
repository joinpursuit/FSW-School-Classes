// const qs = require("qs")

document.addEventListener("DOMContentLoad", () => {
    console.log("hello")
    // let welcomeBtn = document.querySelector("#welcomeBtn")



    let classBtn = document.querySelector("#classBtn");
    let studentBtn = document.querySelector("#studentBtn");
    let fsBtn = document.querySelector("fsBtn");
    let classDisplay = document.querySelector("#newClassDisplay")


    let url = "http://localhost:3000/school"

    const displayNewClass = (url) => {
        
    }






    // addClassButton


classBtn.addEventListener("submit", async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:3000/class/`, { name: className.value, teacher: teacher.value })
})

// ('Chinonso Udo', 'Dallas, Texas', 23, 97.4), 
//             ('Allison Montgomery', 'Charlotte, North Carolina' 27, 86), 
//             ('Blair Waldorf', 'New York City, New York' 25, 97),
//             ('Marcus Allen', 'PG County, Maryland', 22, 89.9),
//             ('Christian Bale', 'Miami, Florida', 29, 90)
//             ('Joffrey Earheart', 'ISan Francisco, California', 21, 59)


})

