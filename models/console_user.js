const books_users = [
    { consoleId: "0", userEmail: "rhojda@pratt.edu" },
    { consoleId: "1", userEmail: "rhojda@pratt.edu" },
    { consoleId: "2", userEmail: "rhojda@pratt.edu" },
    { consoleId: "3", userEmail: "rhojda@pratt.edu" }
];

exports.add = (console_user) => {
    consoles_users.push(console_user);
}

exports.get = (consoleId, userEmail) => {
    return consoles_users.find((console_user) => {
        return console_user.consoleId == consoleId && console_user.userEmail == userEmail;
    });
}

exports.AllForUser = (userEmail) => {
    return consoles_users.filter((console_user) => {
        return console_user.userEmail == userEmail;
    });
}

exports.update = (idx, console_user) => {
    consoles_users[idx] = console_user;
}

exports.upsert = (console_user) => {
    let idx = consoles_users.findIndex((bu) => {
        return bu.consoleId == console_user.consoleId &&
            bu.userEmail == console_user.userEmail;
    });
    if (idx == -1) {
        exports.add(console_user);
    } else {
        exports.update(idx, console_user);
    }
}
