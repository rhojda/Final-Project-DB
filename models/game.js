const games = [
    { title: "Red Dead Redemption 2" },
    { title: "Assassins Creed Unity" },
    { title: "Subnautica" },
    { title: "Destiny" },
    { title: "BioShock 1" },
    { title: "Fallout 76" },
    { title: "Farcry Primal" },
];

exports.add = (game) => {
    games.push(game);
}

exports.get = (idx) => {
    return games[idx];
}

exports.update = (game) => {
    games[game.id] = game;
}

exports.upsert = (game) => {
    if (game.id) {
        exports.update(game);
    } else {
        exports.add(game);
    }
}

exports.all = games