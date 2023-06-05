import { db } from "../database/database.connection.js";
import urlMetadata from "url-metadata";
import fetch from "node-fetch";
global.fetch = fetch;

export async function getTrending(req, res) {
  try {
    //gerar lista com as 10 hashtags mais usadas
    const trending = await db.query(
      `SELECT text FROM tags
                GROUP BY tags
                ORDER BY COUNT(*) DESC
                LIMIT 10`
    );
    res.status(201).send(trending.rows);
  } catch (erro) {
    res.send(erro.message);
  }
}

export async function getPostsByHashtag(req, res) {
  const { hashtag } = req.params;
  try {
    const posts = await db.query(
      `SELECT posts.*, users.username, users."pictureUrl", "tagsPosts".*, tags.text AS hashtagname
      FROM posts
      JOIN sessions ON sessions.id = posts."idSession"
      JOIN users ON sessions."idUser" = users.id
      JOIN "tagsPosts" ON "tagsPosts"."idPost" = posts.id
	  JOIN tags ON "tagsPosts"."idTag" = tags.id
      WHERE "tagsPosts".id = ${hashtag}
      ORDER BY posts.id DESC
      LIMIT 20;`
    );
    const allPosts = posts.rows
    let array = []

    for (let i=0;i<posts.rowCount;i++){  
      let likes = await db.query(`SELECT users.username 
      FROM likes 
      JOIN users ON likes."userId"=users.id 
      WHERE likes."postId"=${allPosts[i].id};`)  
      await urlMetadata(allPosts[i].url)
        .then((metadata) => {
          if (likes.rows===undefined){
            likes.rows=[]
          }
          const object = {
            postId:allPosts[i].id,
            username:allPosts[i].username,
            text:allPosts[i].text,
            pictureUrl:allPosts[i].pictureUrl,
            title:metadata['og:title'],
            description:metadata['og:description'],
            url:metadata.url,
            image:metadata['og:image'],
            peopleLike:likes.rows,
            hashtagname: allPosts[i].hashtagname
          }
            array.push(object) 
        },
          (err) => {
            console.log(err)
          })
          
      }
  res.status(201).send(array);
} catch (erro){
  res.status(500).send(erro.message)
}
}
