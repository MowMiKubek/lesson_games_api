import { Outlet } from "react-router";
import styles from './styles.module.css';
import NavigationBar from "../../components/NavigationBar";

export default function MainLayout() {
    return (
        <>
            <NavigationBar />
            <header className={styles.header}>
            <h1>Games page</h1>
            </header>
            <main className={styles.content}>
                <Outlet />
            </main>
            <footer className={styles.footer}>stopka</footer>
        </>
    )
}