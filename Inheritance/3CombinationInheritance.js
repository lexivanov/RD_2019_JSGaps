function SuperType(name) {
    this.name = name;
    this.colors = ["red", "bluе", "green"];
}

SuperType.prototype.sayName = function () {
    console.log(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.sayAge = function () {
    console.log(this.age);
};

var instancel = new SubType("Nicholas", 29);
instancel.colors.push("black");
console.log(instancel.colors);  // "red,blue,green,black" 
instancel.sayName();            // "Nicholas"; 
instancel.sayAge();             // 29 

var instance2 = new SubType("Greg", 27);
console.log(instance2.colors);  // "red,blue,green" 
instance2.sayName();            // "Greg"; 
instance2.sayAge();             // 27 