import { TodoInterface } from "../Interfaces/TodoInterface";
import Store from "./Store";
import Swal from 'sweetalert2';

class UI {
    addTodoToList(todo: TodoInterface){
        const list =document.getElementById("todo-list")!;
        const tr = document.createElement('tr');
        tr.innerHTML =`
                        <th>${todo.id}</th>
                        <td>${todo.title}</td>
                        <td><input type="checkbox" ${todo.status ? "checked":""} class="form-check-input" onclick="changeStatusTodo(${todo.id})"></td>
                        <td><button class="btn btn-sm btn-outline-danger" onclick="removeTodo(event ,${todo.id})">Delete</button></td>
                        `;
        list.appendChild(tr);
        //we can use ${todo.id} to pass todo id to RemoveTodo
    }

    removeTodo(e: Event, id: number){
        const element = e.target as HTMLElement;
        const pElement = element.parentElement;
        const sElemrnt = pElement?.parentElement as HTMLElement;

        sElemrnt.innerHTML = ``;

        Store.deleteTodoById(id);

        // in element we get <button> tag,
        // in pElement we get <td> tag,<td> tag is <button> parentElement
        // and in sElement we get <tr> tag
        // and in sElement.innerHTML =''; we replace <tr> tag with ''

        Swal.fire({
            title: "Todo item deleted",
            icon: "error",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            position: 'top',
          });
    }
}

export default UI;