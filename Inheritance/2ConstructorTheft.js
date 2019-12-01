function SuperType(name){ 
    this.numbers = [1, 2, 3];
    this.name = name; 
} 

function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
} 

var instancel = new SubType("Nicolas", 1); 
instance1.numbers.push(4); 
console.log(instancel.numbers); // "1,2,3,4"

var instance2 = new SubType("Alex", 2); 
console.log(instance2.numbers); // "1,2,3" 

// Никакого доступа к прототипу родителя, а следовательно и методам в прототипе
// Все методы необходимо писать в конструкторе, что не позволяет задействовать их многократно.
// Решена проблема коллизии ссылочных свойст родителя в потомках