import { db } from "../database/database.connection.js";

export async function getusers(req, res) {
    try{

        res.send("oi");
    } catch (erro){
        res.send(erro.message)
    }
}