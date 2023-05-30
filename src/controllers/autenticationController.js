import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

export async function createAccount(req, res) {
const {email, password, username, pictureUrl}= req.body

    try{

        const emailExiste = await db.query('SELECT * FROM users WHERE email = $1', [email])

        if (emailExiste.rowCount !== 0) return res.status(409).send("e-mail já cadastrado")

        const hash = bcrypt.hashSync(password, 10)

        await db.query(
            'INSERT INTO users (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4)',
         [email, hash, username , pictureUrl])
    
        res.status(201).send("cadastro realizado com");
    } catch (erro){
        res.send(erro.message)
    }
}

export async function loginAccount(req, res) {
    try{

        res.send("oi");
    } catch (erro){
        res.send(erro.message)
    }
}