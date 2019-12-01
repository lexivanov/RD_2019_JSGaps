function deepEqual(a, b) {
    if (a === b) {
        return true;
    }

    if (a == null || typeof (a) != "object" ||
        b == null || typeof (b) != "object") {
        return false;
    }

    let propertiesInA = 0, propertiesInB = 0;
    for (let property in a) {
        propertiesInA += 1;
    }
    for (let property in b) {
        propertiesInB += 1;
        if (!(property in a) || !deepEqual(a[property], b[property])) {
            return false;
        }
    }
    return propertiesInA == propertiesInB;
}

function deepEqualFull() {
    let i, l, leftChain, rightChain;

    function compare2Objects(x, y) {
        let prop;

        if (x === y) {
            return true;
        }

        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }

        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        if (leftChain.includes(x) || rightChain.includes(y)) {
            return false;
        }

        for (prop in y) {
            if (y.hasOwnProperty(prop) !== x.hasOwnProperty(prop)) {
                return false;
            } else if (typeof y[prop] !== typeof x[prop]) {
                return false;
            }
        }

        for (prop in x) {
            if (y.hasOwnProperty(prop) !== x.hasOwnProperty(prop)) {
                return false;
            } else if (typeof y[prop] !== typeof x[prop]) {
                return false;
            }

            switch (typeof (x[prop])) {
                case 'object':
                case 'function':

                    leftChain.push(x);
                    rightChain.push(y);

                    if (!compare2Objects(x[prop], y[prop])) {
                        return false;
                    }

                    leftChain.pop();
                    rightChain.pop();
                    break;

                default:
                    if (x[prop] !== y[prop]) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    }

    if (arguments.length < 1) {
        return true;
    }

    for (i = 1, l = arguments.length; i < l; i++) {

        leftChain = []
        rightChain = [];

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }

    return true;
}