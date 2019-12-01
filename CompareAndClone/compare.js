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

function deepEqualFull(...objects) {
    let i, leftChain, rightChain;

    function compare2Objects(x, y) {
        let prop;

        if (x === y) {
            return true;
        }

        // NaN === NaN
        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date       && y instanceof Date      ) ||
            (x instanceof RegExp     && y instanceof RegExp    ) ||
            (x instanceof String     && y instanceof String    ) ||
            (x instanceof Number     && y instanceof Number    )) {
            return x.toString() === y.toString();
        }

        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        // Сравнение прототипов
        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        // Проверка бесконечной вложенности
        if (leftChain.includes(x) || rightChain.includes(y)) {
            return false;
        }

        // Проверка соответствия типов свойств y типам одноименных свойств x
        for (prop in y) {
            if (y.hasOwnProperty(prop) !== x.hasOwnProperty(prop)) {
                return false;
            } else if (typeof y[prop] !== typeof x[prop]) {
                return false;
            }
        }

        // Проверка соответствия типов свойств x типам одноименных свойств y и если тип совпадает сравнение уже этих свойств
        for (prop in x) {
            if (y.hasOwnProperty(prop) !== x.hasOwnProperty(prop)) {
                return false;
            } else if (typeof y[prop] !== typeof x[prop]) {
                return false;
            }

            switch (typeof (x[prop])) {
                case 'object':
                case 'function':

                    // Добавление объекта в цепочку чтобы выявить циклические зависимости
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

    if (objects.length < 1) {
        return true;
    }

    for (i = 1; i < objects.length; i++) {

        leftChain = []
        rightChain = [];

        if (!compare2Objects(objects[0], objects[i])) {
            return false;
        }
    }

    return true;
}