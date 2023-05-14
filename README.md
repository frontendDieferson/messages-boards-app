# Mural de Recados

O Mural de Recados é uma aplicação web para uso interno de uma empresa, onde a administração pode publicar avisos destinados aos funcionários. Os funcionários podem acessar o mural de recados para visualizar os avisos.

# Funcionalidades

   - Login de administrador
   - Criar um aviso
   - Visualizar a lista de avisos
   - Visualizar um aviso em detalhes
   - Marcar um aviso como lido

## Stack utilizada

   **Next.js com TypeScript:** para o desenvolvimento da aplicação frontend.

**Fastify:** para o desenvolvimento da API backend

**MongoDB:** como banco de dados NoSQL.

**JWT:** para autenticação de administradores

**CSS modules:** para estilização dos componentes

**Axios:** para requisições HTTP

## Instalação

Clone este repositório em sua máquina local.
Na pasta raiz do projeto, execute o comando npm install para instalar todas as dependências do projeto.
Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

```bash
  npm install my-project
  cd my-project
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`MONGO_URI`

`JWT_SECRET`

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/frontendDieferson/mural-recados-novalar.git
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Apêndice

Estrutura do Projeto

A estrutura do projeto é organizada em pastas, cada uma com sua responsabilidade. A seguir, uma breve descrição de cada pasta:

- api: contém os endpoints da API backend.
- components: contém os componentes React utilizados na aplicação.
- lib: contém funções utilitárias e arquivos relacionados à configuração da aplicação.
- pages: contém as rotas da aplicação frontend.
- public: contém arquivos estáticos da aplicação, como imagens e fontes.
- styles: contém arquivos CSS para estilização dos componentes.


## Como colaborar

 1. Faça um fork deste repositório
 2. Crie uma branch para sua feature: git checkout -b minha-feature
 3. Faça suas alterações e commit: git commit -m "Minha feature"
 4. Envie suas alterações para o GitHub: git push origin minha-feature
 5. Abra um pull request


## Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio do issues @frontendDieferson


## Licença

[MIT](https://choosealicense.com/licenses/mit/)


Estrutura de Pastas

Mural de Recados/
├─ components/
│  ├─ Header.tsx
│  ├─ NoticeForm.tsx
│  └─ NoticeList.tsx
├─ pages/
│  ├─ index.tsx
│  ├─ login.tsx
│  ├─ notices.tsx
│  └─ createNotice.tsx
├─ api/
│  ├─ auth.ts
│  └─ notices.ts
├─ styles/
│  ├─ globals.css
│  ├─ variables.css
│  ├─ components/
│  │  ├─ Header.module.css
│  │  ├─ NoticeForm.module.css
│  │  └─ NoticeList.module.css
│  └─ pages/
│     ├─ index.module.css
│     ├─ login.module.css
│     ├─ notices.module.css
│     └─ createNotice.module.css
├─ public/
│  └─ favicon.ico
└─ package.json
