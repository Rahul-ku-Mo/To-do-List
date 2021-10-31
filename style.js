const ul = document.getElementById("ul");
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const save = document.getElementById("save");
const cancel = document.getElementById("cancel");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const newInput = document.getElementById("change");
let _taskno = document.getElementById("_taskno")
let _remaintask = document.getElementById("_remaintask")
//close the modal
const close = function(){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}
//open the modal
const open = function(){
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}
//set local storage
const tasks = JSON.parse(
    localStorage.getItem("todos")
) || [];
//render function 
function renderAllItems() {
    ul.innerHTML = "";

    const fragment = document.createDocumentFragment();
    tasks.forEach(t => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        const editButton = document.createElement("button");
        button.innerHTML = "Delete"
        button.classList.add("btn");

        button.onclick = function(e) {
            deleteIt(t.id);     
        }

        li.innerHTML = t.task;
        li.classList.add("row");
        li.appendChild(editButton);
      
        li.appendChild(button);
        editButton.innerHTML = "Edit";
        editButton.classList.add("edit_btn");

        editButton.onclick = function(e){
           open();     
           newInput.value = t.task;

           save.onclick = function(){
            saveTask(t.id);
            close();
        }
        } 
      
        fragment.appendChild(li);
    });
    _taskno.innerHTML = tasks.length;
    _remaintask.innerHTML = tasks.length;
    ul.appendChild(fragment);
}
//add to localStorage
function addToStorage() {
    localStorage.setItem("todos", JSON.stringify(tasks));
}
//delete from localStorage
function deleteIt(taskId) {
   tasks.forEach(function(task) {
       if(task.id === taskId) {
         
        tasks.splice(tasks.indexOf(task), 1);
        addToStorage();
       }
   })

   renderAllItems();
}
//working of add button
btn.onclick = function() {
    const currentTask = input.value || "";

    const todo = {
        task: currentTask,
        id: Date.now()
    };

    if (currentTask) {
        tasks.push(todo);
        renderAllItems();
        input.value = "";
        addToStorage();
    }
}
//render all items on load
renderAllItems();
//working of cancel button
cancel.addEventListener('click',()=>{
    close();
})
//working of save button
function saveTask(taskID){
    tasks.forEach(task => {
        if(task.id === taskID){

            task.task = newInput.value;
            
            addToStorage();
       }      
    }) 
 renderAllItems();
}