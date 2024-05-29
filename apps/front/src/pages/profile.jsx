import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch('/api/auth/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token') || ''
                }
            });
            const status = response.status;
            if(200 <= status && status <= 299) {
                const userData = await response.json();
                setUser(userData);
            } else {
                setError(true);
                localStorage.removeItem('access_token');
            }
            setLoading(false);
        }
        fetchProfile();
    }, [])

    if(loading)
        return <p>Loading...</p>

    if(error)
        return <Navigate to="/login" />

    const deleteHandler = async () => {
        const email = prompt(`Wpisz swój email (${user.email}) aby usunąć konto`);
        if(email !== user.email) {
            alert('Niepoprawny email');
            return;
        }
        const response = await fetch('/api/auth/profile', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token') || ''
            }
        });
        const status = response.status;
        if(200 <= status && status <= 299) {
            alert('Konto usunięte');
            localStorage.removeItem('access_token');
            navigate('/');            
        } else {
            alert('Błąd usuwania konta');
        }
    }

    return (
        <div>
            <h2>Profile Page</h2>
            <p>Witaj: {user.firstname} {user.lastname}</p>
            <p>email: {user.email}</p>
            <div className="d-flex flex-row justify-content-center gap-2">
                <Link to="/" className="btn btn-outline-primary">Strona główna</Link>
                <Link to="/profile/update" className="btn btn-outline-secondary">Zmień dane</Link>
                <Link to="/profile/change_password" className="btn btn-outline-warning">Zmień hasło</Link>
                <button className="btn btn-outline-danger" onClick={deleteHandler}>Usuń konto</button>
            </div>
        </div>
    )
}