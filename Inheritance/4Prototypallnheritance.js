var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var firstPerson = Object.create(person);
firstPerson.name = "Greg";
firstPerson.friends.push("Rob");

var secondPerson = Object.create(person);
secondPerson.name = "Linda";
secondPerson.friends.push("Barbie"); // friends = ["Shelby", "Court", "Van", "Rob", "Barbie"]


var thirdPerson = Object.create(
    person,
    {
        name: { value: "Victor" }
    }
); 

// Объект становится прототипом объекта.
// Снова проблема ссылочных свойств предка.