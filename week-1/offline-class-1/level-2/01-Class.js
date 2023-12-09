class Animal {
  constructor(name, legCount) {
    this.name = name;
    this.legCount = legCount;
  }
  describe() {
    return `${this.name} has ${this.legCount} legs`;
  }
}

let man = new Animal();
man.name = "Dog";
man.legCount = 4;

let a = man.describe();
console.log(a);
