function shortDeepClone(obj) {
    let recipient = obj;
    let i;
    if (recipient && typeof obj == "object") {
        recipient = obj instanceof Array ? [] : {};
        for (i in obj)
            if (obj.hasOwnProperty(i))
                recipient[i] = dup(obj[i]);
    }
    return recipient
}

// Версия которую можно твитнуть :D

function dup(o, i, r) {
    r = o;
    if (r && typeof o == "object") {
        r = o instanceof Array ? [] : {};
        for (i in o)
            if (o.hasOwnProperty(i))
                r[i] = dup(o[i]);
    }
    return r
}