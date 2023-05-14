import { useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import  createNotice  from '../utils/api';
import Header from '../components/Header';
import NoticeForm from '../components/NoticeForm';

export default function CreateNotice() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  async function handleCreateNotice(data: string) {
    try {
      const token = parseCookies().token;
      await createNotice(data, token);
      router.push('/notices');
    } catch (err) {
      console.error(err);
      setErrorMessage('Erro ao criar recado');
    }
  }

  function handleCancel() {
    router.push('/notices');
  }

  return (
    <>
      <Header />
      <div>
        <h1>Criar novo recado</h1>
        <NoticeForm onSubmit={handleCreateNotice} onCancel={handleCancel} />
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </>
  );
}
