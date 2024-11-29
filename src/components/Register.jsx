import { useState } from "react"
import { registerUser } from "../services/auth"


const Register = ({ setUser, toggleForm, handleRegisterSuccess  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await registerUser(email, password);
      handleRegisterSuccess(newUser);  // Llamar a la función pasada como prop
    } catch (error) {
      setError(error.message); // Mostrar el error recibido
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
        <p>Already have an account?</p>
        <button type="button" onClick={toggleForm}>Login</button>
      </form>
    </div>
  );
};

export default Register;