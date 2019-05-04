## Objetivo

Esse programa tem como objetivo fazer o dump do banco de dados mysql e enviar para o Amazon S3.

OBS: é necessário ter o `mysqldump` instalado na sua máquina.

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

Na variável `CRON_TIME` você deve definir quando o backup será executado, ela possui seis asteriscos separados por espaço. Cada asterisco significa um tempo, seguindo a ordem temos que:

1. representa os segundos (0-59)
2. os minutos (0-59)
3. as horas (0-23)
4. os dias (1-31)
5. os meses (0-11) [Janeiro - Dezembro ]
6. os dias da semana (0-6) [Domingo - Sábado]

## Utilização

Execute o `index.js`:

```
node index.js
```

### Recomendação

Recomendo a execução do `s3-backup` com o `pm2`. Para saber mais sobre ele clique [aqui](http://pm2.keymetrics.io/docs/usage/quick-start/)

Caso use o `pm2`:

```
pm2 start index.js --name=s3-backup
```

## Sobre

Para `Error Tracking` eu utilizo o `Sentry`. Para saber mais sobre ele clique [aqui](https://docs.sentry.io/error-reporting/quickstart/?platform=node#configure-the-dsn)

---

I ♥️ [Rocketseat](https://rocketseat.com.br)
