import {useState} from 'react';
import TodoForm from './TodoForm';
import {RiCloseCircleLine} from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti';

const Todo = ({...props}) => {
    const {todos, completeTodo, removeTodo, updateTodo} = props;

    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    const submitUpdate = (value) => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: '',
        })
    }

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }

    return todos.map(todo => (
        <div className={todo.complete ? 'todo-row complete' : 'todo-row'} key={todo.id}>
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.title}
            </div>
            <div className="icons">
                <RiCloseCircleLine className="delete-icon" onClick={() => removeTodo(todo.id) }/>
                <TiEdit className="edit-icon" onClick={() => setEdit({ id: todo.id, value: todo.title}) } />
            </div>
        </div>
    ))
}

export default Todo;