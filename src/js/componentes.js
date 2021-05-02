import { Todo } from '../classes/todo.class';
import { todoList } from '../index';


const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const filtros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( tarea ) => {

    const todoHtml = `
                    <li class="${ (tarea.completado) ? "completed" : "" }" data-id="${ tarea.id }">
                        <div class="view">
                            <input class="toggle" type="checkbox" ${ (tarea.completado) ? "checked" : "" }>
                            <label>${ tarea.tarea }</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="Create a TodoMVC template">
                    </li>    
                    `;

    const div = document.createElement('div');
    div.innerHTML = todoHtml;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;

}

// recibir datos del input
txtInput.addEventListener('keyup', ( event ) => {

    if ( event.keyCode === 13 && txtInput.value.length > 0 ){
        
        const tarea = new Todo( txtInput.value );
        todoList.nuevoTodo( tarea );

        crearTodoHtml( tarea );
        txtInput.value = "";
    }


});

divTodoList.addEventListener('click', (event) => {

    console.log('click');
    const etiquetaClickeada = event.target.localName; //input, button, label
    const divElemento        = event.target.parentElement.parentElement;
    const idElemento        = divElemento.getAttribute('data-id');

    
    if ( etiquetaClickeada.includes('input') ){
        todoList.marcarCompletado( idElemento );
        divElemento.classList.toggle('completed');
    } else if ( etiquetaClickeada.includes('button') ){
        todoList.eliminarTodo( idElemento );
        divTodoList.removeChild( divElemento );
    }

    console.log( todoList );

});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarTodos();

    for(let i = divTodoList.children.length - 1; i >= 0; i-- ){
        const elementoHijo = divTodoList.children[i];
        if( elementoHijo.classList.contains('completed') ){
            divTodoList.removeChild(elementoHijo);
        }
    }


});

filtros.addEventListener('click', (event) => {

    const filtro = event.target.text;

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');
    
    if ( !filtro ){ return; }

    for(const elemento of divTodoList.children ){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch( filtro ){
            case 'Pendientes':
                if ( completado ){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if ( !completado ){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }

});