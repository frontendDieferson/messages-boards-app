import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import Header from '../components/Header';
import NoticeList from '../components/NoticeList';
import { getNotices } from '../utils/api';
import { Notice } from '@/types/types';

interface IndexProps {
  notices: Notice[];
}

export default function Index({ notices }: IndexProps) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Mural de Recados</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <NoticeList />
      </main>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { token } = parseCookies(context);

//   if (!token) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   try {
//     const notices = await getNotices(token);
//     return {
//       props: { notices },
//     };
//   } catch (err) {
//     console.error(err);
//     return {
//       props: { notices: [] },
//     };
//   }
// };
