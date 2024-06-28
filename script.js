const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");
const eliminarTodo = document.querySelector(".eliminarTodo");


eliminarTodo.style.display="none";


//Cargar las tareas guardadas en el localStorage 
document.addEventListener("DOMContentLoaded",loadTasks);





addBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const text = input.value;

    if(text!==""){
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent=text;
    li.appendChild(p);
    li.appendChild(addDeleteBtn());
    ul.appendChild(li);


    input.value="";
    empty.style.display="none";
    eliminarTodo.style.display="block";

    saveTasks();
    }
    input.focus();
});

eliminarTodo.addEventListener("click", (e)=>{
    ul.innerHTML="";
    eliminarTodo.style.display="none";
    empty.style.display="block"
    localStorage.removeItem("tasks")
    input.focus();
})

function addDeleteBtn(){
 const deleteBtn = document.createElement("button");
 deleteBtn.textContent="X";
 deleteBtn.className="btn-delete";

 deleteBtn.addEventListener("click", (e)=>{
    const item = e.target.parentElement; /*e.target se refiere al botón que fue clicado. e.target.parentElement obtiene el elemento padre del botón, que en este caso es el elemento <li> que contiene la tarea.*/ 
    ul.removeChild(item);

    const items = document.querySelectorAll("li");
    if(items.length===0){
        empty.style.display="block";
        eliminarTodo.style.display="none";
    }
    saveTasks();
    input.focus();
 });
 return deleteBtn;
}


function saveTasks(){
    const tasks = [];
    const items = document.querySelectorAll("li p");
    items.forEach(item=>tasks.push(item.textContent));
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks"))||[]; /*se utiliza para proporcionar un valor por defecto en caso de que localStorage.getItem('tasks') devuelva null*/
    tasks.forEach(task=>{
        const li = document.createElement("li");
        const p = document.createElement("p")
        p.textContent=task;
        li.appendChild(p);
        li.appendChild(addDeleteBtn());
        ul.appendChild(li);
    })

    if(tasks.length>0){
        empty.style.display="none";
        eliminarTodo.style.display="block"
    }
    input.focus();
}


