import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { createNotice, getNotices } from '../utils/api';
import Header from '../components/Header';
import NoticeForm from '../components/NoticeForm';
import NoticeList from '../components/NoticeList';

export default function Notices() {
  const router = useRouter();
  const [notices, setNotices] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchNotices() {
      try {
        const token = parseCookies().token;
        const response = await getNotices(token);
        setNotices(response);
      } catch (err) {
        console.error(err);
        setErrorMessage('Erro ao carregar recados');
      }
    }
    fetchNotices();
  }, []);

  async function handleCreateNotice(data) {
    try {
      const token = parseCookies().token;
      await createNotice(data, token);
      const response = await getNotices(token);
      setNotices(response);
    } catch (err) {
      console.error(err);
      setErrorMessage('Erro ao criar recado');
    }
  }

  function handleLogout() {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  }

  return (
    <>
      <Header onLogout={handleLogout} />
      <div>
        <h1>Criar novo recado</h1>
        <NoticeForm onSubmit={handleCreateNotice} />
        {errorMessage && <p>{errorMessage}</p>}
        <h1>Recados</h1>
        <NoticeList notices={notices} />
      </div>
    </>
  );
}
