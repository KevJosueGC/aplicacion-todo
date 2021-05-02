

export class Todo {

    static fromJson({ id, tarea, completado, fecha }){

        const tempTodo = new Todo( tarea );

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.fecha = fecha;

        return tempTodo;

    }

    constructor( tarea ){
        this.tarea = tarea;

        //inicializacion de variables de inicio

        this.id = new Date().getTime();

        this.completado = false

        this.fecha = new Date();

    }


    imprimirTodo(){
        console.log(`${ this.tarea } - ${ this.id }`);
    }

}