import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import jwt_decode from 'jwt-decode';
import './App.css';

function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    /* global google */
    const handleCallbackResponse = (response) => {
      const userObject = jwt_decode(response.credential)
      // console.log(userObject)
      setUser(userObject);
    }

    google.accounts.id.initialize({
      client_id: "270649257834-lqc1q8pllbv1mr2e46eqld87t16vdlv0.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    })

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large'}
    )

  }, [])

  useEffect(() => {console.log({user})}, [user])

  return (
    <div className="todo-app">
      <div id="signInDiv" />
      <TodoList user={user}/>
    </div>
  );
}

export default App;
