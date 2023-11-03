let todoForm = document.querySelector(".todoForm")
let todoInput = document.querySelector(".todoInput")
let todoButton = document.querySelector(".todoButton")
let list = document.querySelector(".list")
let messages = document.querySelector(".message")

const local = () => {
   return localStorage.getItem("methods") ? JSON.parse(localStorage.getItem("methods")) : [] ;
}


const todoAdd = (event) => {
    event.preventDefault();
    let todoValue = todoInput.value;
    const todoId = Date.now().toString()
    createTodo(todoId, todoValue)

    message("todo is added", "succes")

    const todos = local()

    todos.push({todoId, todoValue})
    localStorage.setItem("methods", JSON.stringify(todos))


    todoInput.value = ""
   
}



todoForm.addEventListener("submit", todoAdd)

const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li")
    todoElement.classList.add("li-style")
    todoElement.id = todoId;
    todoElement.innerHTML = `<span> ${todoValue} </span> <span> <button id="deletebtn" class="btn" > delete </button> </span>`;
    list.appendChild(todoElement)

    let dbtn = todoElement.querySelector("#deletebtn")
    dbtn.addEventListener("click", dtodo)
    
}

const dtodo = (event) => {
 const selectedTodo = event.target.parentElement.parentElement;
 
 list.removeChild(selectedTodo)
 message("todo is deleted", "danger")

 let todoss = local()
 todoss = todos.filter((todo) => todo.id != selectedTodo.id)
 localStorage.setItem("methods", JSON.stringify(todoss))
}

const message = (text, color) => {
    messages.innerHTML = `${text}`
    messages.classList.add(`message-${color}`)

    setTimeout(() => {
        messages.innerHTML = ``
        messages.classList.remove(`message-${color}`)
    },1000)
}



