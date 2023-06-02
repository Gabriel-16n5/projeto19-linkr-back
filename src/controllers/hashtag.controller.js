import { db } from "../database/database.connection.js";

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
    // Gerar posts da hashtag
    const hashPost = await db.query(
      `
        SELECT
          posts.id,
          posts.text,
          posts.url,
          users.username,
          users.pictureUrl,
          array_agg(tags.name) as hashtags
        FROM posts
          JOIN users ON posts.idSession = users.id
          JOIN tagsPosts ON posts.id = tagsPosts.idPost
          JOIN tags ON tagsPosts.idTag = tags.id
        WHERE tags.name = ANY($1)
        GROUP BY posts.id, users.username, users.pictureUrl
        LIMIT 20;
      `,
      [hashtag]
    );

    res.status(201).send(hashPost);
  } catch (error) {
    res.send(error.message);
  }
}
