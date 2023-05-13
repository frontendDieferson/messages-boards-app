import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { authenticate } from "./auth";

interface Notice {
    id: number;
    title: string;
    content: string;
    recipient: string;
    author: string;
    createdAt: Date;
}

let notices: Notice[] = [
    {
        id: 1,
        title: 'Aviso 1',
        content: 'Conteúdo do aviso 1',
        recipient: 'Funcionário 1',
        author: 'Admin',
        createdAt: new Date('2023-05-09T10:00:00Z'),
      },
      {
        id: 2,
        title: 'Aviso 2',
        content: 'Conteúdo do aviso 2',
        recipient: 'Funcionário 2',
        author: 'Admin',
        createdAt: new Date('2023-05-09T11:00:00Z'),
      },
]

export default function noticesRoute(fastify: FastifyInstance, options: any, done: () => void ) {
    fastify.get('/notices', async(request: FastifyRequest, reply: FastifyReply) => {
        if(!authenticate(request)) {
            reply.status(401).send({ error: 'Unauthorized' })
            return
        }

        const { recipient } = request.query
        const filteredNotices = recipient
        ? notices.filter((notice) => notice.recipient === recipient)
        : notices

        reply.send({ notices: filteredNotices })
        
    })

    fastify.post('/notices', async (request: FastifyRequest, reply: FastifyReply) => {
        if (!authenticate(request)) {
          reply.status(401).send({ error: 'Unauthorized' });
          return;
        }

        const { title, content, recipient } = request.body
        const id = notices.length + 1
        const author = request.user.username
        const createdAt = new Date()

        const notice: Notice = {id, title, content, recipient, author, createdAt}
        notices.push(notice)

        reply.status(200).send({ notice })
})
        done();

    
}