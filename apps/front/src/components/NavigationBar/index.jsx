import styles from './styles.module.css';
import { Link, redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NavigationBar() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if(token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [loggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        redirect('/');
    }

    return (
        <nav className={styles.nav}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/test">Test</Link></li>
            </ul>
            <ul>
                {
                    loggedIn
                    ? <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </>
                    : <li><Link to="/login">Login</Link></li>
                }
                
            </ul>
        </nav>
    )
}