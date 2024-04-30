const users_consoles = [
    { consoleId: "0", userEmail: "rhojda@pratt.edu" },
];

exports.add = (user_console) => {
    users_consoles.push(user_console);
}

exports.get = (consoleId, userEmail) => {
    return users_consoles.find((user_console) => {
        return user_console.consoleId == consoleId && user_console.userEmail == userEmail;
    });
}

exports.AllForUser = (userEmail) => {
    return users_consoles.filter((user_console) => {
        return user_console.userEmail == userEmail;
    });
}

exports.update = (idx, user_console) => {
    users_consoles[idx] = user_console;
}

exports.upsert = (user_console) => {
    let idx = users_consoles.findIndex((bu) => {
        return bu.consoleId == user_console.consoleId &&
            bu.userEmail == user_console.userEmail;
    });
    if (idx == -1) {
        exports.add(user_console);
    } else {
        exports.update(idx, user_console);
    }
}
