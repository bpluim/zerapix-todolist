import {useState, useEffect, useRef} from 'react';

const TodoForm = ({onSubmit, edit}) => {
    const [value, setValue] = useState(edit ? edit.value : '');

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();  
    })

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!edit) {
            onSubmit({
                id: Math.floor(Math.random() * 10000),
                title: value,
                complete: false,
            });
        } else {
            onSubmit({
                id: edit.id,
                title: value,
            })
        }

        setValue('');
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            {!edit ? (
                <div>
                    <input
                        type="text"
                        placeholder="Add a todo"
                        value={value}
                        name="text"
                        className="todo-input"
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button className="todo-button">Add Todo</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Update todo"
                        value={value}
                        name="text"
                        className="todo-input edit"
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button className="todo-button edit">Update</button>
                </div>
            )}
        </form>
    )
}

export default TodoForm;