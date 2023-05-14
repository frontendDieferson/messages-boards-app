import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getNotices } from '../utils/api';
import { Notice } from '../types/types';
import styles from '../styles/components/NoticeList.module.css';

export default function NoticeList() {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getNotices();
        setNotices(data);
      } catch (err) {
        setError('Não foi possível carregar os recados. Por favor, tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const handleNoticeClick = (noticeId: string) => {
    router.push(`/notices/${noticeId}`);
  };

  return (
    <div className={styles.container}>
      <h2>Recados</h2>
      {isLoading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : notices.length > 0 ? (
        <ul className={styles.noticeList}>
          {notices.map((notice) => (
            <li key={notice.id} className={styles.noticeItem} onClick={() => handleNoticeClick(notice.id)}>
              <div className={styles.noticeTitle}>{notice.title}</div>
              <div className={styles.noticeContent}>{notice.content}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há recados.</p>
      )}
    </div>
  );
}
