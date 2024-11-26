import { TodoInterface } from "./Interfaces/TodoInterface.js";
import Todo from "./classes/Todo.js";
import UI from "./classes/UI.js";
import Store from "./classes/Store.js";


const form = document.getElementById("todo-form") as HTMLFormElement;
const title = document.getElementById("title") as HTMLInputElement;
const titleError =document.getElementById('title-error') as HTMLParagraphElement;

const ui = new UI();

form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    if(title.value.trim() === ''){
        titleError.innerHTML = 'Title id required ...'
    }else{
        titleError.innerHTML = ''
        const todoObj: TodoInterface = {
            id: Math.round(Math.random() * 100),
            title: title.value.trim() ,
            status: false
        }
        const todo = new Todo(todoObj);

        ui.addTodoToList(todo);
        Store.addTodo(todo);//becus is static, dont need to make object fo Store class, We can use the class directly.

        title.value ='';//for removing input after add task
    }
});

(window as any).changeStatusTodo = (id: number) => {
    Store.changeStatus(id)
}

(window as any).removeTodo = (e: Event,id: number) => {
    ui.removeTodo(e,id)
}

document.addEventListener("DOMContentLoaded", Store.displayTodos);