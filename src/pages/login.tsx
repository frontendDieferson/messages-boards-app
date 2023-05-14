import { useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { login } from '../utils/api';
import styles from '../styles/pages/login.module.css';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { token } = await login(email, password);
      setCookie(null, 'token', token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });
      router.push('/');
    } catch (err) {
      console.error(err);
      setErrorMessage('Email ou senha incorretos');
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h1>Login</h1>
        {errorMessage && <p>{errorMessage}</p>}
        <div>
          <label className={styles.inputLabel} htmlFor="email">Email:</label>
          <input
             className={styles.inputField}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label  className={styles.inputLabel} htmlFor="password">Senha:</label>
          <input
             className={styles.inputField}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Link href='/index'>
        <button className={styles.submitBtn} type="submit">Entrar</button>

        </Link>
      </form>
    </div>
  );
}
