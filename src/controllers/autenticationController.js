import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

export async function createAccount(req, res) {
const {email, password, username, pictureUrl}= req.body

    try{
        // Verificar se esse e-mail já foi cadastrado
        const emailExiste = await db.query('SELECT * FROM users WHERE email = $1', [email])
        if (emailExiste.rowCount !== 0) return res.status(409).send("e-mail já cadastrado")

        // Criptografar senha
        const hash = bcrypt.hashSync(password, 10)

        // Criar conta e guardar senha encriptada no banco
        await db.query(
            'INSERT INTO users (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4)',
         [email, hash, username , pictureUrl])
    
        res.status(201).send("cadastro realizado com sucesso");
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
            const senhaEstaCorreta = bcrypt.compareSync(password, usuario.senha)
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