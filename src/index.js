import './styles.css'
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes.js';

export const todoList = new TodoList();

// Crear la tarea

todoList.todos.forEach( todo => crearTodoHtml( todo ) );

console.log('todos:', todoList.todos);

console.log( todoList.todos[0].imprimirTodo() );