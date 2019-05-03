## Objetivo

Esse programa tem como objetivo fazer o dump do banco de dados mysql e enviar para o Amazon S3.

## Instalação

Faça o clone desse repositório na sua máquina:

```
git clone https://github.com/HigoRibeiro/s3-backup.git
```

Instale as dependências:

```
npm install
```

## Configuração

Copie o arquivo `.env.example` para `.env`:

```
cp .env.example .env
```

Altere as variáveis conforme a necessidade de acesso.

## Utilização

Execute o `index.js`:

```
node index.js
```

### Recomendação

Recomendo a execução do `s3-backup` com o `pm2`. Para saber mais sobre ele clique [aqui](http://pm2.keymetrics.io/docs/usage/quick-start/)

## Sobre

Para `Error Tracking` eu utilizo o `Sentry`. Para saber mais sobre ele clique [aqui](https://docs.sentry.io/error-reporting/quickstart/?platform=node#configure-the-dsn)

---

I ♥️ [Rocketseat](https://rocketseat.com.br)
