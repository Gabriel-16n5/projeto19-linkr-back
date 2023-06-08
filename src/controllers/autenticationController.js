import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

export async function createAccount(req, res) {
const {email, password, username, pictureUrl}= req.body

    try{
        // Verificar se esse e-mail já foi cadastrado
        const validation = await db.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username])
        if (validation.rowCount !== 0) return res.status(409).send("e-mail ou usuário já cadastrado")
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
            const senhaEstaCorreta = bcrypt.compareSync(password, usuario.rows[0].password)
            if (!senhaEstaCorreta) return res.status(401).send("Senha incorreta")
    
            // Se deu tudo certo, criar um token para enviar ao usuário
            const token = uuid()
    
            //Verificamos se o usuario ja logou com esta conta no banco antes
            const sessionExist = await db.query(`SELECT * FROM sessions WHERE "idUser" = $1;`, [usuario.rows[0].id])
            // Guardaremos o token e o id do usuário para saber que ele está logado
            
            if (!sessionExist.rows[0]){
                // Se for a primeira vez do usuario logando adicionaremos seus dados na tabela
                await db.query(`INSERT INTO sessions (token, "idUser") VALUES ($1, $2)`, [token, usuario.rows[0].id])
            } else {
                // Se o usuario ja tiver logado antes, apenas trocaremos seu token de validacao na tabela
                await db.query(`UPDATE sessions SET token=$1 WHERE "idUser"=$2;`, [token, usuario.rows[0].id])
            }
            // Finalizar com status de sucesso e enviar token para o cliente

            res.status(201).send({
                token,
                username: usuario.rows[0].username,
                userUrl: usuario.rows[0].pictureUrl,
                idUser: usuario.rows[0].id
                
            })
    
        } catch (err) {
        res.send(err.message)
    }
}