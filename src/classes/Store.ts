import { TodoInterface } from "../Interfaces/TodoInterface.js";
import UI from "./UI.js";


class Store{
    static getTodo(): TodoInterface[] {
        let todos: TodoInterface[];

        if(localStorage.getItem('todos')){
            todos =JSON.parse(localStorage.getItem('todos')!); 
            //We assure TypeScript that this variable has a value and is not empty or
            //we can write as string instead of !
        }
        else{
            todos =[]
        }

        return todos;
    }

    static displayTodos(){
        const todos = Store.getTodo();

        const ui = new UI();

        todos.forEach((todo) => {
            ui.addTodoToList(todo);
        })
    }

    static addTodo(todo: TodoInterface){
        const todos = Store.getTodo();
        todos.push(todo);
        localStorage.setItem('todos' , JSON.stringify(todos));//save change
    }

    static deleteTodoById(id: number){
        const todos = Store.getTodo();//old todos
        const newTodos = todos.filter((todo) => todo.id !==id);//todos after delete todo by id
        localStorage.setItem('todos' , JSON.stringify(newTodos));//save changes -> this code delete last todos and add newTodos
    }

    static changeStatus(id: number){
        const todos = Store.getTodo();//old todos
        const newTodos = todos.map((todo) => todo.id ===id ? {...todo,status: !todo.status}:todo);//find todo by id and if can find todo change status if cant find todo, this code return todo
        //{...todo} => bring todo all data ->id-title-status
        //status: !todo.status => if status=false ->status=true
        //newTodo is updated todo object

        localStorage.setItem('todos' , JSON.stringify(newTodos));//save changes -> this code delete last todos and add newTodos
    }
}

export default Store;