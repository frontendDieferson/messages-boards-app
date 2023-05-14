import { useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { login } from '../utils/api';
import styles from '../styles/Login.module.css';

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
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {errorMessage && <p>{errorMessage}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
