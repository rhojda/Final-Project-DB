const db = require('../database');

exports.all = async () => {
    const { rows } = await db.getPool().query("select * from games order by id");
    return db.camelize(rows);
}

exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from games where id = $1", [id])
    return db.camelize(rows)[0]
}

exports.create = async (title) => {
    return db.getPool().query("INSERT INTO games(title) VALUES($1) RETURNING *", [title]);
}

exports.update = async (id, title) => {
    return db.getPool().query("UPDATE games SET title = $1 where id = $2 RETURNING *", [title, id]);
}

exports.upsert = async (game) => {
    if (game.id) {
        return exports.update(game.id, game.title)
    }
    return exports.create(game.title)
}
