import { db } from "../database/database.connection.js";
import urlMetadata from "url-metadata";
import fetch from "node-fetch";
global.fetch = fetch;

export async function postTags(req, res) {
  const { tag } = req.body
  try {
    const validation = await db.query(`
    SELECT tags.text
    FROM tags
    WHERE tags.text = $1
    `, [tag])
    if(validation.rows.length > 0){
      return console.log("aready inside")
    } else {
    const postTags = await db.query(`INSERT INTO tags (text) VALUES ($1);`, [tag])
    res.status(201).send(postTags.rows);      
    }

  } catch (erro) {
    res.send(erro.message);
  }
}

export async function getTrending(req, res) {
  try {
    //gerar lista com as 10 hashtags mais usadas
    const trending = await db.query(
      `SELECT tags.text FROM tags
      GROUP BY tags.text
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
      `SELECT posts.*, users.username, users."pictureUrl", "tagsPosts".*, tags.text AS hashtagname, tags.text AS tag
      FROM posts
      JOIN sessions ON sessions.id = posts."idSession"
      JOIN users ON sessions."idUser" = users.id
      JOIN "tagsPosts" ON "tagsPosts"."idPost" = posts.id
	    JOIN tags ON "tagsPosts"."idTag" = tags.id
      WHERE tags.text = $1
      ORDER BY posts.id DESC
      LIMIT 20;`, [hashtag]
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
            tag:allPosts[i].tag,
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
        console.log(array)
      }
  res.status(201).send(array);
} catch (erro){
  res.status(500).send(erro.message)
}
}
