import { useState } from "react"


export default function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 1. Pobrać dane
        // 2. Wysłać dane na serwer
        // 3. Sprawdzić odpowiedź
        // TODO
        // 4a. Zapisać token w local storage
        // 4b. Wyświetlić błąd
        
        // const data = { username: login, password: password };
        const data_parsed = JSON.stringify({ username: login, password });
        const response = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data_parsed
        });
        console.log(response.status)
        const status = response.status;
        if(200 <= status && status <= 299) {
            alert('Zalogowano');
        } else if(400 <= status && status <= 499) {
            alert('Błąd logowania');
        }

        // const data = await response.json();
    }

    return (
        <div>
            <h2>Login to your account</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}