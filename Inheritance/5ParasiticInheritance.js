function createAnother(original) {
    var clone = object(original);
    clone.sayHi = function () {
        alert("hi");
    };
    return clone;
}

// Скорее паттерн чем инструкция.
// object - любая функция возвращающая объект на основе предыдущего.