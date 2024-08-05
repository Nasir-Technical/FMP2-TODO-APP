const todoLists = document.querySelector(".todo-list");
const listValue = document.querySelector(".todovalue");
let todoListValue = [];

const getTodoListFromLS = () => {
    return JSON.parse(localStorage.getItem("todoData")) || [];
};

const addTodoListlocalStorage = (todo) => {
  localStorage.setItem("todoData", JSON.stringify(todo));
};

const showTodoList = () => {
    todoListValue = getTodoListFromLS();
    todoListValue.forEach((curTodo) => {
        const liElement = document.createElement("li");
        liElement.innerHTML = curTodo;
        todoLists.append(liElement);     
    });
};

const removeTodoList = (e) => {
   console.log(e.target.textContent);
   let currentTodo = e.target.textContent;
   console.log(todoListValue);

   // Corrected filter condition
   todoListValue = todoListValue.filter(
    (curTodoValue) => curTodoValue !== currentTodo
   );

   addTodoListlocalStorage(todoListValue);
   e.target.remove();
   console.log(todoListValue);
}

const addTodoList = (e) =>{
    e.preventDefault();
    
    todoListValue = getTodoListFromLS();
    let newTodo = listValue.value.trim();
    console.log(newTodo);
     
    listValue.value="";

    if (newTodo.length > 0 && !todoListValue.includes(newTodo)) {
        console.log(typeof todoListValue);
        todoListValue.push(newTodo);
        todoListValue = [...new Set(todoListValue)];    
      
        addTodoListlocalStorage(todoListValue);

        const liElement = document.createElement("li");
        liElement.innerHTML = newTodo;
        todoLists.append(liElement); 
    }
};

showTodoList();

document.querySelector(".btn").addEventListener("click", (e) =>{
    addTodoList(e);
});

todoLists.addEventListener("click", (e) => removeTodoList(e));
