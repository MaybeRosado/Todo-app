import { useState } from "react"
import { loginUser } from "../services/auth"
import Register from "./Register";


const Login = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const loggedUser = await loginUser(email, password);
      setUser(loggedUser);
    }catch (error){
      setError(error.message);
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  }

  const handleRegisterSuccess = (newUser) => {
    setUser(newUser);
    setIsRegistering(false);
  };
  
  return (
    <div >
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      {!isRegistering ? (
        // Formulario de login
        <form onSubmit={handleSubmit} >
          <div>
            <label
              
            >Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              
              required 
            />
          </div>
          <div>
            <label
              
            >Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              
            />
          </div>
          {error && <p >{error}</p>}
          <button type="submit" >Login</button>
          <p >Not registered?</p>
          <button type="button" onClick={toggleForm}>Create an account</button>
        </form>
      ) : (
        // Formulario de registro
        <Register setUser={setUser} toggleForm={toggleForm} handleRegisterSuccess={handleRegisterSuccess}/>
      )}
    </div>
  );
}

export default Login