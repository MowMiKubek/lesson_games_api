import styles from './styles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';

export default function NavigationBar() {
    // const authManager = useAuth();
    const {isAuthenticated, setIsAuthenticated} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
        navigate('/');
    }

    return (
        <nav className={styles.nav}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/test">Test</Link></li>
            </ul>
            <ul>
                {
                    isAuthenticated
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