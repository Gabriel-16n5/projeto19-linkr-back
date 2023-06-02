import { db } from "../database/database.connection.js";

export async function getPostsUser(req, res) {
    const {id} = req.params
    try{

        res.send("oi");
    } catch (erro){
        res.send(erro.message)
    }
}