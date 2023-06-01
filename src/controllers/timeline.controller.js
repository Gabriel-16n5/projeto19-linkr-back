import { db } from "../database/database.connection.js";

export async function createPost(req, res) {
  const { url, text } = req.body;

  // O cliente deve enviar um header de authorization com o token
  const { authorization } = req.headers;

  // para pegar o token vamos tirar a palavra Bearer
  const token = authorization?.replace("Bearer ", "");

  // Se não houver token, não há autorização para continuar
  if (!token) return res.status(401).send("Token inexistente");

  try {
    // Caso o token exista, precisamos descobrir se ele é válido
    const sessao = await db.query(`SELECT * FROM sessions WHERE token = $1`, [
      token,
    ]);
    // Verifica se há alguma sessão encontrada
    if (sessao.rows.length === 0) return res.status(401).send("Token inválido");

    // Caso a sessão tenha sido encontrada, iremos guardar na variável "sessao" o objeto de sessão encontrado
    const sessaoEncontrada = sessao.rows[0];

    // Tendo o id do usuário, podemos procurar seus dados
    const usuario = await db.query(`SELECT * FROM users WHERE id = $1`, [
      sessaoEncontrada.idUser,
    ]);
    // Verifica se o usuário foi encontrado
    if (usuario.rows.length === 0)
      return res.status(401).send("Usuário não encontrado");

    await db.query(
      `INSERT INTO posts (url, text, "idSession") VALUES ($1, $2, $3)`,
      [url, text, sessaoEncontrada.id]
    );
    res.status(201).send("Post criado com sucesso");
  } catch (erro) {
    res.send(erro.message);
  }
}

export async function getPost(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Token inexistente");
  try {
    const sessao = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);

    if (sessao.rows.length === 0) return res.status(401).send("Token inválido");
    const sessaoEncontrada = sessao.rows[0];
    
    const posts = await db.query(
      `SELECT * FROM posts ORDER BY id DESC LIMIT 20`
    );
    
    res.status(201).send(posts.rows);
  } catch (erro) {
    res.send(erro.message);
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  // O cliente deve enviar um header de authorization com o token
  const { authorization } = req.headers;

  // para pegar o token vamos tirar a palavra Bearer
  const token = authorization?.replace("Bearer ", "");

  // Se não houver token, não há autorização para continuar
  if (!token) return res.status(401).send("Token inexistente");
  console.log(token)
  try {
    // Caso o token exista, precisamos descobrir se ele é válido
    const sessao = await db.query(`SELECT * FROM sessions WHERE token = $1`, [
      token,
    ]);
    // Verifica se há alguma sessão encontrada
    if (sessao.rows.length === 0) return res.status(401).send("Token inválido");

    // Caso a sessão tenha sido encontrada, iremos guardar na variável "sessao" o objeto de sessão encontrado
    const sessaoEncontrada = sessao.rows[0];
    console.log(sessaoEncontrada)
    // Tendo o id do usuário, podemos procurar seus dados
    const usuario = await db.query(`SELECT * FROM users WHERE id = $1`, [
      sessaoEncontrada.idUser,
    ]);
    console.log(usuario.rows[0])
    // Verifica se o usuário foi encontrado
    if (usuario.rows.length === 0)
      return res.status(401).send("Usuário não encontrado");

    // Verificar se o post existe e pertence ao usuário
    const postExiste = await db.query(`SELECT * FROM posts WHERE id = $1 AND "idSession" = $2`, [id, sessaoEncontrada.id]);
    if (postExiste.rows.length === 0) {
    return res.status(404).send("Post não encontrado ou não pertence ao usuário");
    }

    //Deletar
    await db.query(`DELETE FROM posts WHERE id=$1`,[id]);

    res.status(201).send("Post deletado com sucesso");
  } catch (erro) {
    res.send(erro.message);
  }
}

export async function editPost(req, res) {
  const { id } = req.params;
  const { text } = req.body;
  // O cliente deve enviar um header de authorization com o token
  const { authorization } = req.headers;

  // para pegar o token vamos tirar a palavra Bearer
  const token = authorization?.replace("Bearer ", "");

  // Se não houver token, não há autorização para continuar
  if (!token) return res.status(401).send("Token inexistente");

  try {
    // Caso o token exista, precisamos descobrir se ele é válido
    const sessao = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token,]);
    // Verifica se há alguma sessão encontrada
    if (sessao.rows.length === 0) return res.status(401).send("Token inválido");

    // Caso a sessão tenha sido encontrada, iremos guardar na variável "sessao" o objeto de sessão encontrado
    const sessaoEncontrada = sessao.rows[0];

    // Tendo o id do usuário, podemos procurar seus dados
    const usuario = await db.query(`SELECT * FROM users WHERE id = $1`, [
      sessaoEncontrada.idUser,
    ]);
    // Verifica se o usuário foi encontrado
    if (usuario.rows.length === 0)
      return res.status(401).send("Usuário não encontrado");

    // Verificar se o post existe e pertence ao usuário
    const postExiste = await db.query(`SELECT * FROM posts WHERE id = $1 AND userId = $2`, [id, sessaoEncontrada.idUser]);
    if (postExiste.rows.length === 0) {
    return res.status(404).send("Post não encontrado ou não pertence ao usuário");
    }

    //editar
    await db.query(`UPDATE posts SET text=$1 WHERE id=$2`, [text, id])

    res.status(201).send("Post editado com sucesso");
  } catch (erro) {
    res.send(erro.message);
  }
}

export async function postLikes(req, res) {
  const { postId } = req.body
  // O cliente deve enviar um header de authorization com o token
  const { authorization } = req.headers;
  // para pegar o token vamos tirar a palavra Bearer
  const token = authorization?.replace("Bearer ", "");
   // Se não houver token, não há autorização para continuar
   if (!token) return res.status(401).send("Token inexistente");

    try {
      const userId = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])

      const checkLikeExist = await db.query(`SELECT * FROM likes WHERE "userId"=$1 AND "postId"=$2`, [userId.rows[0].idUser ,postId])

      if(checkLikeExist.rows[0]) return res.status(404).send("Post already liked, you can only delete this like")

      await db.query(`INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`, [userId.rows[0].idUser ,postId])

      res.status(200).send("Post liked by this user successfully")
    } catch (erro) {
      res.send(erro.message);
    }
}

export async function deleteLikes(req, res) {
  const { postId } = req.body
  // O cliente deve enviar um header de authorization com o token
  const { authorization } = req.headers;
  // para pegar o token vamos tirar a palavra Bearer
  const token = authorization?.replace("Bearer ", "");
   // Se não houver token, não há autorização para continuar
   if (!token) return res.status(401).send("Token inexistente");

    try {
      const userId = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])

      const likeInfo = await db.query(`SELECT * FROM likes WHERE "userId"=$1 AND "postId"=$2`, [userId.rows[0].idUser ,postId])

      console.log(likeInfo.rows[0])

      if (!likeInfo.rows[0]) return res.status(404).send("This post isnt liked by this user yet")

      await db.query(`DELETE FROM likes WHERE id=$1`, [likeInfo.rows[0].id])

      res.send("Like deleted successfully").status(201)
    } catch (erro) {
      res.send(erro.message);
    }
}