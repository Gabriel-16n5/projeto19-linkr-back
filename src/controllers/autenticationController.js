import { db } from "../database/database.connection.js";

export async function createAccount(req, res) {
    try{

        res.send("oi");
    } catch (erro){
        res.send(erro.message)
    }
}

export async function loginAccount(req, res) {
        const { email, password, } = req.body

        try {
            // Verificar se o e-mail está cadastrado
            const usuario = await db.query('SELECT * FROM users WHERE email = $1', [email])
            if (usuario.rowCount === 0) return res.status(404).send("usuário não encontrado")
    
            // Verificar se a senha digitada corresponde com a criptografada
            const senhaEstaCorreta = bcrypt.compareSync(senha, usuario.senha)
            if (!senhaEstaCorreta) return res.status(401).send("Senha incorreta")
    
            // Se deu tudo certo, criar um token para enviar ao usuário
            const token = uuid()
    
            // Guardaremos o token e o id do usuário para saber que ele está logado
            await db.query(`INSERT INTO sessoes (token, "userId") VALUES ($1, $2)`, [token, usuario.rows[0].id])
    
            // Finalizar com status de sucesso e enviar token para o cliente
            res.status(201).send(token)
    
        } catch (err) {
        res.send(err.message)
    }
}