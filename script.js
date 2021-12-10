function getActiveItems () {
    db.collection('todo-items').onSnapshot( (snapshot) => {
        console.log(snapshot);
        let items = [];
        snapshot.docs.forEach( (doc) =>{
            items.push({
                id : doc.id,
                ...doc.data()
            })
        })
        generateActiveItems(items);
    })
}

function generateActiveItems (items){
    let itemsHTML = '';
       items.forEach((item)=>{
        if (item.status == 'active'){
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

        }
          
        })
        
    document.querySelector('.todo-items').innerHTML  = itemsHTML; 
    document.getElementById('all').style.color = 'hsl(233, 14%, 35%)'
    document.getElementById('completed').style.color = 'hsl(233, 14%, 35%)'
    document.getElementById('active').style.color = 'hsl(220, 98%, 61%)'
}


function getCompletedItems () {
    db.collection('todo-items').onSnapshot( (snapshot) => {
        console.log(snapshot);
        let items = [];
        snapshot.docs.forEach( (doc) =>{
            items.push({
                id : doc.id,
                ...doc.data()
            })
        })
        generateCompletedItems(items);
    })
}

function generateCompletedItems (items){
    let itemsHTML = '';
       items.forEach((item)=>{
        if (item.status == 'completed'){
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

        }
          
        })
        
    document.querySelector('.todo-items').innerHTML  = itemsHTML; 
    document.getElementById('all').style.color = 'hsl(233, 14%, 35%)'
    document.getElementById('completed').style.color = 'hsl(220, 98%, 61%)'
    document.getElementById('active').style.color = 'hsl(233, 14%, 35%)'
}


// db.collection("todo-items").doc(clear.dataset.id).delete()

function getclearItems () {
    db.collection('todo-items').onSnapshot( (snapshot) => {
        console.log(snapshot);
        let items = [];
        snapshot.docs.forEach( (doc) =>{
            items.push({
                id : doc.id,
                ...doc.data()
            })
        })
        clearCompleted(items);
    })
}

function clearCompleted (items){
    items.forEach( (item)=> {
        if (item.status == 'completed') db.collection("todo-items").doc(item.id).delete();
    })

    generateActiveItems();
}
