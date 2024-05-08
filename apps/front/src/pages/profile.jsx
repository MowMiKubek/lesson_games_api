import { useEffect, useState } from "react";
import { Navigate } from "react-router";

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch('http://localhost:3001/api/auth/profile', {
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
    }, [loading, user])

    if(loading)
        return <p>Loading...</p>

    if(error)
        return <Navigate to="/login" />

    return (
        <div>
            <h2>Profile Page</h2>
            <p>Witaj: {user.firstname} {user.lastname}</p>
            <p>email: {user.email}</p>
        </div>
    )
}