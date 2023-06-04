import { db } from "../database/database.connection.js";

export async function getPostsUser(req, res) {
    const {id} = req.params
    try{

        res.send("oi");
    } catch (erro){
        res.send(erro.message)
    }
}

export async function getUser(req, res) {
    const {name} = req.params
    try{
        const user = await db.query(`SELECT id,username,"pictureUrl" FROM users WHERE username LIKE '%${name}%';`)
        res.status(200).send(user.rows);
    } catch (erro){
        res.status(500).send(erro.message)
    }
}