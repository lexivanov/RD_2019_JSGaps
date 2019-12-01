// Исходная точка алгоритма

const clonersMap = {
    'object':   cloneObject,
    'function': cloneFunction
};

function deepClone(source) {
    return (clonersMap[typeof source] || clonePrimitive)(source)();
}

// Функция которая позволяет изменять значение, если нам это необходимо

function simpleFunctor(value) {
    return mapper => mapper ? simpleFunctor(mapper(value)) : value;
}

//#region Функции для разных типов данных

function clonePrimitive(source) {
    return () => source;
}

function cloneObject(source) {
    return Array.isArray(source)
        ? () => source.map(deepClone)
        : clonePrototype(source, cloneFields(source, simpleFunctor({})));
}

function cloneFunction(source) {
    return cloneFields(source, simpleFunctor(function () {
        return source.apply(this, arguments);
    }));
}

//#endregion

//#region Хэлперы для клонирования обьекта

function clonePrototype(source, destinationFunctor) {
    return destinationFunctor(destination => Object.setPrototypeOf(destination, Object.getPrototypeOf(source)));
}

function cloneFields(source, destinationFunctor) {
    return Object.getOwnPropertyNames(source)
        .concat(Object.getOwnPropertySymbols(source))
        .reduce(makeCloneFieldReducer(source), destinationFunctor);
}

//#endregion

// Непосредственно фабрика редьюсера для клонирования полей

function makeCloneFieldReducer(source) {
    return (destinationFunctor, field) => {
        const descriptor = Object.getOwnPropertyDescriptor(source, field);
        return destinationFunctor(destination => Object.defineProperty(
            destination,
            field,
            'value' in descriptor
                ? {
                    ...descriptor,
                    value: deepClone(descriptor.value)
                }
                : descriptor
        ));
    };
}