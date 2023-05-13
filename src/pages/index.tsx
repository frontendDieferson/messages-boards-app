import Head from "next/head"
import { GetServerSideProps } from 'next';
import { parseCookies } from "nookies"
import { useRouter } from "next/router"





export default function Index()  {
    return (
        <div>
            <Head>
                <title>Messages Boards</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    )
}


export async function getServerSideProps(context: any) {
    const { token } = parseCookies(context);

    if(!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    try {
        const notices = await getNotices(token);
        return {
            props: {notices},
        }
    } catch(err) {
        console.error(err)
        return {
            props: {notices: []}
        }
    }
}