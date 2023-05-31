   /*
   import { db } from "../database/database.connection.js"; 

   export default async function auth (req, res, next) {
  // O cliente deve enviar um header de authorization com o token
  const { authorization } = req.headers;

  // para pegar o token vamos tirar a palavra Bearer
  const token = authorization?.replace("Bearer ", "");

  // Se não houver token, não há autorização para continuar
  if (!token) return res.status(401).send("Token inexistente");

  try {
    // Caso o token exista, precisamos descobrir se ele é válido
    const sessao = await db.query(`SELECT * FROM session WHERE token = $1`, [token]);
    // Verifica se há alguma sessão encontrada
    if (sessao.rows.length === 0) return res.status(401).send("Token inválido");

    // Caso a sessão tenha sido encontrada, iremos guardar na variável "sessao" o objeto de sessão encontrado
    const sessaoEncontrada = sessao.rows[0];

    // Tendo o id do usuário, podemos procurar seus dados
    const usuario = await db.query(`SELECT * FROM users WHERE id = $1`, [sessaoEncontrada.userId]);
    // Verifica se o usuário foi encontrado
    if (usuario.rows.length === 0) return res.status(401).send("Usuário não encontrado");

    res.locals.session = sessaoEncontrada;

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
  }
*/

