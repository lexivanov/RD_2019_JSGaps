function SuperType(name) {
    this.name = name;
    this.colors = ["red", "bluе", "green"];
}

SuperType.prototype.sayName = function () {
    alert(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name);                         // Второй вызов конструктора предка
    this.age = age;
}

SubType.prototype = new SuperType();                    // Первый вызов конструктора предка

// SubType.prototype = Object.create(SuperType.prototype); // Решение

SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
    alert(this.age);
};