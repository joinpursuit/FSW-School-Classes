document.addEventListener("DOMContentLoaded",()=>{

//   let find = document.querySelector("#find")
// const getdata = async ()=>{
//        try{
//         let res = await axios.get("http://localhost:3000/students")
//         let arrdata = Object.values(res.data[0])
//         arrdata.forEach((el)=>{
//            let li= document.createElement("li")
//             let uli = document.querySelector("#uli")
//             li.innerText = el
//             uli.appendChild(li)
//         })
   
//        }catch(err){
//            console.log(err)
//        }
//      }
// find.addEventListener("click",()=>{
//    getdata()
//      })




// let drop = document.querySelector("#drop") 
let headerspan = document.querySelector(".headerspan")
let adlist = document.querySelector("#adlist")
let evlist = document.querySelector("#evlist")
let calist = document.querySelector("#calist")
let melist = document.querySelector("#melist")

let listarray = ["tution","application","criteria","alumni"]



// headerspan.addEventListener("mouseout",()=>{
//   setTimeout(function(){}, 2000);
// })





let dropone = document.querySelector("#dropone")
let dropthree = document.querySelector("#dropthree")
let dropfour = document.querySelector("#dropfour")

    headerspan.addEventListener("mouseover",()=>{
      listarray.forEach((el,i)=>{
 if(i<listarray.length){
  let li = document.createElement("li")
  li.innerText = el 
  adlist.appendChild(li)
  setTimeout(function(){  adlist.removeChild(li)}, 2000);
 }
        })
    })

    dropone.addEventListener("mouseover",()=>{
      listarray.forEach((el,i)=>{
  if(i<listarray.length){
    let li = document.createElement("li")
    li.innerText = el 
    evlist.appendChild(li)
    setTimeout(function(){  evlist.removeChild(li)}, 2000);
  }
        })
    })

    //-------
    dropthree.addEventListener("mouseover",()=>{
      listarray.forEach((el,i)=>{
  if(i<listarray.length){
    let li = document.createElement("li")
    li.innerText = el 
    calist.appendChild(li)
    setTimeout(function(){  calist.removeChild(li)}, 2000);
  }
        })
    })

    //-------
   dropfour.addEventListener("mouseover",()=>{
      listarray.forEach((el,i)=>{
  if(i<listarray.length){
    let li = document.createElement("li")
    li.innerText = el 
    melist.appendChild(li)
    setTimeout(function(){  melist.removeChild(li)}, 2000);
  }
        })
    })





















})




















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



