function SuperType() {
    this.property = [1, 2, 3];       // Все ссылочные типы в конструкторе родителя будут едины 
}                                    // для всех экземпляров класса потомка т.к. прототипом служит один объект

SuperType.prototype.getSuperValue = function () {
    return this.property;
};

// SuperType.prototype.pushSuperValue = function (x) {
//     return this.property.push(x);
// };

function SubType() {
    this.subproperty = false;
}

SubType.prototype = new SuperType();  // Аргументы для конструктора родителя можно передать
                                      // только один раз для всех экземпляров класса-наследника,
                                      // причем они никак не зависят от конструктора класса-наследника

SubType.prototype.getSubValue = function () {
    return this.subproperty;
};

var instance1 = new SubType();
// var instance2 = new SubType();

// console.log(instance1.property);
// console.log(instance2.property);
// instance1.pushSuperValue(4);
// console.log(instance1.property);
// console.log(instance2.property);