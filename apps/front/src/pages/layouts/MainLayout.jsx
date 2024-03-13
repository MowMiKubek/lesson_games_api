import { Outlet } from "react-router";
import styles from './styles.module.css';

export default function MainLayout() {
    return (
        <>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/test">Test</a></li>
                    <li><a href="/login">login</a></li>
                </ul>
            </nav>
            <header>
                <h1>Games page</h1>
            </header>
            <Outlet />
            <footer className={styles.footer}>stopka</footer>
        </>
    )
}