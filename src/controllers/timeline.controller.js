import { db } from "../database/database.connection.js";

export async function createPost(req, res) {

        try{

            res.status(201).send("oi");
        } catch (erro){
            res.send(erro.message)
        }
    }

export async function getPost(req, res) {
    
        try{

            res.status(201).send("oi");
        } catch (erro){
            res.send(erro.message)
        }
    }

export async function deletePost(req, res) {
    
        try{

            res.status(201).send("oi");
        } catch (erro){
            res.send(erro.message)
        }
    }

export async function editPost(req, res) {
    
        try{

            res.status(201).send("oi");
        } catch (erro){
            res.send(erro.message)
        }
    }