

document.addEventListener("DOMContentLoaded",()=>{

    const pullData = async ()=>{
        try{
            let res = await axios.get("http://localhost:3000/students")
            console.log(res)
        }catch(err){
            console.log(err)
                }
        }

let query = document.querySelector("#query")
query.addEventListener("click",pullData()) 















// const wipeOut = ()=>{
//     let choicebutton = document.querySelectorAll(".choicebutton")
//     choicebutton.forEach((el)=>{
//         el.addEventListener("click",()=>{
//             let mainContainer = document.querySelector("#mainContainer")
//             mainContainer.parentNode.removeChild(mainContainer)
//             let secondMain = document.querySelector("#secondMain")
//             secondMain.parentNode.appendChild(secondMain)    
//                      })
                   
//          })
       
//      }
//      wipeOut()
// })



