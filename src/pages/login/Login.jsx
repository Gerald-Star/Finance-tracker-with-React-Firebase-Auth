// to track what the user is typing in the input fields, we need to use the state hook
// we need to import the useState hook from react

import { useState } from "react";

//styles
import styles from './Login.module.css';


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

  }


  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h1>Login</h1>
      <label>
        <span>email:</span>

        <input type="email"
        onChange={(e) => setEmail(e.target.value)}
        value = {email}
        
        />
      </label>

      <label>

        <span>password:</span>
        <input type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        
        
        />
      </label>
      <button className='btn'>Login</button>
    </form>
  );
}
