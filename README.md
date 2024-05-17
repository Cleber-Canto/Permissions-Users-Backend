Aqui está um exemplo de `README.md` para o seu projeto `permissions_users_backend`, com base na estrutura do projeto que você forneceu:

```markdown
# Permissions Users Backend

Este é um projeto de backend para gerenciar permissões de usuários, usando Node.js, Express e Prisma.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

```
permissions_users_backend/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │   ├── PermissionController.ts
│   │   ├── ProductController.ts
│   │   ├── RoleController.ts
│   │   ├── SessionController.ts
│   │   ├── UserController.ts
│   │
│   ├── middlewares/
│   │   ├── permission.ts
│   │   ├── errorHandler.ts
│   │
│   ├── routes/
│   │   ├── permissionRoutes.ts
│   │   ├── productRoutes.ts
│   │   ├── roleRoutes.ts
│   │   ├── sessionRoutes.ts
│   │   ├── userRoutes.ts
│   │
│   ├── services/
│   │   ├── PermissionService.ts
│   │   ├── ProductService.ts
│   │   ├── RoleService.ts
│   │   ├── SessionService.ts
│   │   ├── UserService.ts
│   │
│   ├── utils/
│   │   ├── prisma.ts
│   │
│   ├── server.ts
│
├── .env
├── tsconfig.json
├── package.json
├── .dockerignore
├── docker-compose.yaml
├── Dockerfile
├── .gitignore
```

## Configuração do Ambiente

Antes de iniciar o projeto, certifique-se de ter o Node.js e o Docker instalados em sua máquina.

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/permissions_users_backend.git
   cd permissions_users_backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:
   Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias. Por exemplo:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
   JWT_SECRET="your-very-secure-secret"
   ```

## Configuração do Docker

### Dockerfile

Crie um arquivo chamado `Dockerfile` na raiz do projeto com o seguinte conteúdo:

```dockerfile
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
```

### docker-compose.yml

Crie um arquivo chamado `docker-compose.yml` na raiz do projeto com o seguinte conteúdo:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    volumes:
      - .:/usr/src/app
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Para iniciar o projeto com Docker, execute:
```bash
docker-compose up --build
```

## Prisma

### Configuração do Prisma

O arquivo `schema.prisma` está localizado na pasta `prisma`. Ele define o esquema do banco de dados.

### Migrações

Para criar e aplicar migrações do Prisma, use os seguintes comandos:

1. Crie uma migração:
   ```bash
   npx prisma migrate dev --name init
   ```

2. Gere o cliente Prisma:
   ```bash
   npx prisma generate
   ```

### Seed (opcional)

Para popular o banco de dados com dados iniciais (seed), crie um arquivo `seed.ts` na pasta `prisma` e adicione o seguinte script:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Adicione seus dados iniciais aqui
  const user = await prisma.user.create({
    data: {
      username: 'admin',
      password: 'adminpassword', // Lembre-se de usar hash na senha em produção
    },
  });

  console.log({ user });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Para rodar o seed:
```bash
npx ts-node prisma/seed.ts
```

## Iniciar o Projeto

Para iniciar o projeto em desenvolvimento, execute:
```bash
npm run dev
```

Para iniciar o projeto em produção, execute:
```bash
npm run build
npm start

Prisma Studio

Para abrir o Prisma Studio, que é uma interface gráfica para visualizar e gerenciar seus dados, execute:

bash

npx prisma studio
```

## Testes

Para configurar as collections para teste, recomendamos o uso do Insomnia ou Postman. Crie requisições para cada rota disponível e verifique se todas estão funcionando corretamente.

### Exemplo de Requisições

- **POST /products** - Criar um novo produto (Requer permissão ROLE_ADMIN)
- **GET /products** - Listar todos os produtos (Requer permissão ROLE_ADMIN ou ROLE_USER)
- **GET /products/:id** - Obter detalhes de um produto específico (Requer permissão ROLE_ADMIN ou ROLE_USER)

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Para isso, siga os passos abaixo:

1. Fork este repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/sua-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona minha feature'`).
4. Faça o push para a branch (`git push origin feature/sua-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

https://youtu.be/TGCwB9oMR0o?si=7AgG1pxPK6fk9Jfr
```

Este `README.md` fornece uma visão geral clara da estrutura do projeto, instruções de configuração, como iniciar o projeto, configurações do Docker, uso do Prisma e outras informações úteis. Ajuste conforme necessário para se adequar melhor ao seu projeto específico.