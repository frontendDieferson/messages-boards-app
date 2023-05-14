import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from '../utils/withAuth';

import styles from '../styles/components/Header.module.css';



export default function Header() {
    const router = useRouter()
    const { user, logout } = useAuth()
    const [ menuOpen, setMenuOpen ] = useState(false)

    const handleLogout = async () => {
        await logout()
        router.push('/login')
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link href="/">
                        <a>Messages Board App</a>
                    </Link>
                </div>
                {user ? (
                    <>
                     <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
                        <i className="fa fa-bars"></i>
                     </div>
                     <ul className={`${styles.menu} ${menuOpen ? styles.open : ''} `}>
                        <li>
                            <Link href="/notices">
                                <a>Recados</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/createNotice">
                                <a>Criar Recado</a>
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Sair</button>
                        </li>
                     </ul>
                    </>
                ): (
                    <ul className={styles.menu}>
                        <li>
                            <Link href="/login">
                                <a>Login</a>
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    )
}