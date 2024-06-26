import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {isAuthenticated, setIsAuthenticated} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data_parsed = JSON.stringify({ username: login, password });
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data_parsed
        });
        const status = response.status;
        const data = await response.json();
        const token = data.access_token;
        if(200 <= status && status <= 299) {
            localStorage.setItem('access_token', token);
            setIsAuthenticated(true);
            navigate('/');
        } else if(400 <= status && status <= 499) {
            alert('Błąd logowania');
        }
        // const data = await response.json();
    }

    if(isAuthenticated) {
        return <Navigate to="/"/>
    }

    return (
        <div>
            <h2>Login to your account</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            <p>Don't have account? You can create one <Link to="/register">here</Link></p>
        </div>
    )
}