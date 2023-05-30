import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";



const Login = () => {
    
    const [err, setErr] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
            
        } catch (err) {
            setErr(true);
        }
        
    }
    
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Pasiu Chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="emial" placeholder="email"/>
                    <input type="password" placeholder="hasło"/>
                    <button>Zaloguj</button>
                    {err && <span>Coś poszło nie tak...</span>}
                </form> 
                <p>Nie masz konta? <Link to="/register">Załóż konto</Link></p>
            </div>
        </div>
        
    )
}

export default Login