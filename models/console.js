const consoles = [
    { name: "XBOX 360" },
    { name: "XBOX One" },
    { name: "PS4" },
    { name: "PS5" },
];

exports.add = (console) => {
    consoles.push(console);
}

exports.get = (idx) => {
    return consoles[idx];
}

exports.update = (console) => {
    consoles[console.id] = console;
}

exports.upsert = (console) => {
    if (console.gameIds && !Array.isArray(console.gameIds)) {
        console.gameIds = [console.gameIds];
    }
    if (console.id) {
        exports.update(console);
    } else {
        exports.add(console);
    }
}

exports.all = consoles