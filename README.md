# RM ERP — Backend

Base da Sprint 1: setup, schema do banco e autenticação separada
entre Painel Admin RM Digital e App das empresas clientes.

## Como rodar localmente

```bash
cd backend
npm install
cp .env.example .env   # ajuste DATABASE_URL e os JWT secrets
npx prisma migrate dev --name init
npm run start:dev
```

Servidor sobe em `http://localhost:3000`. Teste com:

```bash
curl http://localhost:3000/health
```

## O que já existe

- Schema Prisma completo (`companies`, `admin_users`, `users`,
  `plans`, `subscriptions`, `licenses`, `announcements`)
- Login separado: `/admin/auth/login` (admin_users) e
  `/app/auth/login` (users)
- Guards que impedem token de um domínio funcionar no outro
- CRUD mínimo de empresas: `GET /admin/companies`,
  `POST /admin/companies` (exige token de admin)

## O que NÃO existe ainda (proposital, é para sprints futuras)

- UI do painel admin e do app cliente
- Ativar/bloquear empresa, troca de plano, cobrança de mensalidade
- Estatísticas gerais, comunicados, licenças (só a tabela existe)

## Primeiro admin_user

Ainda não há seed. Para criar o primeiro usuário admin manualmente,
gere um hash bcrypt da senha e insira direto no banco, ou peça para
eu criar um script de seed na próxima etapa.
