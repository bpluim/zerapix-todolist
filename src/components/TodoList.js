import {useState, useEffect} from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

const TodoList = ({user}) => {
    const [todoList, setTodoList] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => {
                return response.json()
            })
            .then(data => setTodoList(data))
            .catch(err => console.log(err));
    }, [])

    const addTodo = (todo) => {
        if (!todo.title || /^\s*$/.test(todo.title)) return

        const newTodos = [todo, ...todoList];

        setTodoList(newTodos);
    };

    const completeTodo = (id) => {
        let updatedTodos = todoList.map(todo => {
            if (todo.id === id) {
                todo.complete = !todo.complete
            }
            return todo
        })
        setTodoList(updatedTodos)
    }

    const removeTodo = (id) => {
        const removeArr = [...todoList.filter(todo => todo.id !== id)]
        setTodoList(removeArr);
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.title || /^\s*$/.test(newValue.title)) return

        setTodoList(prev => prev.map(todo => (todo.id === todoId ? newValue : todo)))
    }

    if (!user) return

    return (
        <div>
            <h1>What's the plan for today {user.given_name}?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todoList}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}    
            />
        </div>
    )
}

export default TodoList;