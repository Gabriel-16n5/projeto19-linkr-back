import { db } from "../database/database.connection.js"

export async function postFollowers(req, res) {
    const {idUser, followedUser} = req.body

    const checkFollow = await db.query(`SELECT * FROM followers WHERE "idUser"=$1 AND "followedUser"=$2`, [idUser, followedUser])

    if (checkFollow.rows[0]) return res.status(404).send("You are already following this person, you can only unfollow him/her")

    try {
        await db.query(`INSERT INTO followers ("idUser", "followedUser") VALUES ($1, $2)`,[idUser, followedUser])
        res.status(201).send("Following succeed")
    } catch (erro) {
      res.send(erro.message);
    }
  }

  export async function deleteFollowers(req, res) {
    const {idUser, followedUser} = req.params

    const checkFollow = await db.query(`SELECT * FROM followers WHERE "idUser"=$1 AND "followedUser"=$2`, [idUser, followedUser])

    if (!checkFollow.rows[0]) return res.status(404).send("You are not following this person, you can only follow him/her")

    try {
        await db.query(`DELETE FROM followers WHERE "idUser"=$1 AND "followedUser"=$2`,[idUser, followedUser])
        res.status(201).send("Unfollowing succeed")
    } catch (erro) {
      res.send(erro.message);
    }
  }