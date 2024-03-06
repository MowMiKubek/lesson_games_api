import styles from './styles.module.css';

export default function CardWrapper({ children }) {
    return (
        <main className={styles.wrapper}>
            {children}
        </main>
    )
}