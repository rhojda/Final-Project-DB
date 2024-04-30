const db = require('../database');

exports.all = async () => {
    const { rows } = await db.getPool().query("select * from consoles order by id");
    return db.camelize(rows);
}

exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from consoles where id = $1", [id])
    return db.camelize(rows)[0]
}

exports.create = async (name) => {
    return db.getPool().query("INSERT INTO consoles(name) VALUES($1) RETURNING *", [name]);
}

exports.update = async (id, name) => {
    return db.getPool().query("UPDATE consoles SET name = $1 where id = $2 RETURNING *", [name, id]);
}

exports.upsert = async (console) => {
    if (console.id) {
        return exports.update(console.id, console.name)
    }
    return exports.create(console.name)
}

