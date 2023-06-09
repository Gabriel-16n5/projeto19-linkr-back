import { db } from "../database/database.connection.js";
import urlMetadata from "url-metadata";
import fetch from "node-fetch";
global.fetch = fetch;
export async function getPostsUser(req, res) {
    const {id,num} = req.params
    try{
        const posts = await db.query(
            `SELECT posts.*,users.username,users."pictureUrl", tags.text AS tag
            FROM posts 
            JOIN sessions ON sessions.id=posts."idSession" 
            JOIN users ON sessions."idUser"=users.id 
            JOIN "tagsPosts" ON "tagsPosts"."idPost" = posts.id
            JOIN tags ON "tagsPosts"."idTag" = tags.id
            WHERE users.id=${id}
            ORDER BY posts.id DESC LIMIT ${num};`
          );
          const allPosts = posts.rows
    
          let array = []

          for (let i=0;i<posts.rowCount;i++){  
            let likes = await db.query(`SELECT users.username FROM likes JOIN users ON likes."userId"=users.id WHERE likes."postId"=${allPosts[i].id};`)  
            await urlMetadata(allPosts[i].url)
              .then((metadata) => {
                if (likes.rows===undefined){
                  likes.rows=[]
                }
                const object = {
                  postId:allPosts[i].id,
                  username:allPosts[i].username,
                  text:allPosts[i].text,
                  tag:allPosts[i].tag,
                  pictureUrl:allPosts[i].pictureUrl,
                  title:metadata['og:title'],
                  description:metadata['og:description'],
                  url:metadata.url,
                  image:metadata['og:image'],
                  peopleLike:likes.rows
                }
                  array.push(object) 
              },
                (err) => {
                  console.log(err)
                })
                
            }
            console.log(array)

        res.status(201).send(array);
    } catch (erro){
        res.status(500).send(erro.message)
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