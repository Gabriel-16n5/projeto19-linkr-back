<h1 align="center">Linkr - Node / SQL</h1>

✅ Requisitos
- Tecnologias
    - [ ] Front-end: utilize React e styled-components
    - [ ]  Back-end: utilize Node, express e Postgres como banco
    - [ ]  Arquitetura back-end: utilize os padrões aprendidos de `routers`, `controllers`, `schemas`, `repositories` e `middlewares`.
- Processo de desenvolvimento
    - [ ]  Cada requisito do projeto deve ser desenvolvimento inteiramente **por uma pessoa.** Ou seja, essa pessoa irá tocar **front**, **back** e **banco** de cada requisito que atacar. **Você já é um(a) dev full-stack!** Não deve haver divisões do tipo "fulano toca o front, beltrano toca o back".
    - [ ]  Para utilizar Git, uma pessoa do grupo deve criar os repositórios públicos no seu GitHub e compartilhar o projeto com os outros membros do grupo.
    - [ ]  É obrigatório o uso de **branches** e **pull requests** para cada feature implementada.
    - [ ]  Todo pull request **deve ser revisado** por uma outra pessoa do grupo.
    - [ ]  É necessário usar variáveis em ambiente no front-end e no back-end. Também não deve-se commitar o arquivo `.env`. Veja a parte de Correção automática para mais detalhes.
- Banco de dados
    - [ ]  Utilize o banco de dados PostgreSQL.
    - [ ]  Modele o banco de dados de acordo com a necessidade.
    - [ ]  Cuidado com conexão SSL. Se for configurar conexão SSL para deploy, o avaliador não conseguirá se conectar. Se for rodar o avaliador desative a conexão SSL ou ative-a somente para deploy via variáveis de ambiente. Ex.:
        
        ```jsx
        import pg from "pg"
        import dotenv from "dotenv"
        dotenv.config()
        
        const { Pool } = pg
        
        const configDatabase = {
          connectionString: process.env.DATABASE_URL,
        };
        
        if (process.env.NODE_ENV === "production") configDatabase.ssl = true;
        
        export const db = new Pool(configDatabase);
        ```
        
        Então ative adicione no deploy (e somente no deploy) a variável de ambiente
        
        ```jsx
        NODE_ENV === "production"
        ```
        
- Dump do banco de dados
    - [ ]  É **obrigatório** fazer o **dump do banco de dados e colocá-lo dentro da pasta raiz do projeto**. O arquivo gerado deve ter o nome `dump.sql`.
    - [ ]  Para a criação do dump, você deve seguir o tutorial fornecido na seção de tutoriais do notion da sua turma: ‣
- Deploy
    - [ ]  Faça o deploy da sua aplicação (front, API e o banco).
    - [ ]  A ideia este projeto é **fazer deploys continuamente**, toda vez que uma tarefa estiver pronta. Só depois do deploy ela poderá ser considerada “**no ar**”, última etapa do desenvolvimento.
    - [ ]  Na hora de fazer o deploy do banco, cuidado com conexão SSL! Se for configurar conexão SSL para deploy, o avaliador não conseguirá se conectar. Se for rodar o avaliador, desative a conexão SSL ou ative-a somente para deploy via variáveis de ambiente.
        
        ```jsx
        import pg from "pg"
        import dotenv from "dotenv"
        dotenv.config()
        
        const { Pool } = pg
        
        const configDatabase = {
          connectionString: process.env.DATABASE_URL,
        };
        
        if (process.env.MODE === "prod") configDatabase.ssl = true;
        
        export const db = new Pool(configDatabase);
        ```
        
        Então adicione no deploy (e somente no deploy) a variável de ambiente a seguir:
        
        ```jsx
        MODE = prod
        // variável de ambiente chamada **MODE** com o valor **prod** sem aspas
        ```


## 🛠 &nbsp;Skills
<div align="center">
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" width="52" alt="node logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" width="52" alt="js logo"  />      
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" width="52" alt="express logo"  />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg" height="40" width="52" alt="npm logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="40" width="52" alt="git logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="40" width="52" alt="github logo" />                                   
</div>
<hr/>

## 🚀 &nbsp;Links

- [Deploy back](https://linkr-wxue.onrender.com/).<br/>

```zsh
# iniciar servidor
npm run dev

# rodar banco
brew services start postgresql 
psql postgres 
brew services restart postgresql@14
   
# matar a porta comando no MAC
kill -9 PID

# listar as postar que estao sendo usada
lsof -i :5000
```

<hr/>
