import { db } from "../database/database.connection.js";

export async function createAccount(req, res) {
    try{

        res.send("oi");
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