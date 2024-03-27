import { Outlet } from "react-router";
import styles from './styles.module.css';

export default function MainLayout() {
    return (
        <>

            <header className={styles.header}>
            <nav className={styles.nav}>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/test">Test</a></li>
                    <li><a href="/login">login</a></li>
                </ul>
            </nav>
                <h1>Games page</h1>
            </header>
            <Outlet />
            <footer className={styles.footer}>stopka</footer>
        </>
    )
}