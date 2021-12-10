function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo-input");
    db.collection('todo-items').add({
        text : text.value ,
        status : 'active'
    })
    text.value = '';
}

function getItems () {
    db.collection('todo-items').onSnapshot( (snapshot) => {
        console.log(snapshot);
        let items = [];
        snapshot.docs.forEach( (doc) =>{
            items.push({
                id : doc.id,
                ...doc.data()
            })
        })
        generateItems(items);
        leftItems(items);
    })
}

function generateItems (items){
    let itemsHTML = '';
       items.forEach((item)=>{
        
           itemsHTML += `
                <div class="todo-item">
                <div class="check">
                    <div data-id="${item.id}" class="check-mark ${item.status == 'completed' ? 'checked' : ''}" >
                        <img src="assets/icon-check.svg" >
                    </div>
                </div>
                <div class="todo-text ${item.status == 'completed' ? 'checked' : ''}"  >
                    ${item.text}
                </div> 
            </div>
                `

        })
        
    document.querySelector('.todo-items').innerHTML  = itemsHTML; 
    document.getElementById('all').style.color = 'hsl(220, 98%, 61%)'
    document.getElementById('completed').style.color = 'hsl(233, 14%, 35%)'
    document.getElementById('active').style.color = 'hsl(233, 14%, 35%)'
    creatEventListeners();
}

function leftItems (items){
    let activeNum = 0;
    items.map((item)=>{
        if (item.status == 'active'){
            activeNum ++;
        }
        
    })
    console.log(activeNum);
    document.getElementById('items-left').innerHTML =  `${activeNum} items left`
}

function creatEventListeners (){
    let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
    todoCheckMarks.forEach( (checkMark) => {
        checkMark.addEventListener("click", function (){
                 markCompleted(checkMark.dataset.id);
        })
    })
     
}


function markCompleted(id){
    let item = db.collection("todo-items").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().status == "active"){
                item.update({
                    status: "completed"
                })
            } else {
                item.update({
                    status: "active"
                })
            }
        }
    })
}

getItems(); 



function themeFunction (){
   document.body.classList.toggle('dark-mode');

   let img = document.getElementById('thImg').src;

   if ( img.indexOf('assets/lightmode.jpg') != -1 ){
    document.getElementById('thImg').src = 'assets/bg-desktop-dark.jpg'
   } else{
    document.getElementById('thImg').src = 'assets/lightmode.jpg'
   }


   let icon = document.getElementById('icon').src;
   
   if ( icon.indexOf('assets/icon-sun.svg') != -1 ){
    document.getElementById('icon').src = 'assets/icon-moon.svg'
   } else{
    document.getElementById('icon').src = 'assets/icon-sun.svg'
   }

 }
