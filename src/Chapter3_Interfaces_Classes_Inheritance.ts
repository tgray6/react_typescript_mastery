import addNumbers from './Modules_EndOfChapter3';

/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Interfaces
███████████████████████████████████████████████████████████████████████████████████████
*/

interface IIdName {
    id: number;
    name: string;
};

let idObject: IIdName = {
    name: "Jean",
    id: 2
};

console.log(JSON.stringify(idObject, null, 3));


/*
███████████████████████████████████████████████████████████████████████████████████████
                            Optional Properties
███████████████████████████████████████████████████████████████████████████████████████
*/

interface IOptional {
    id: number;
    name?: string;
};

//notice this no longer has the error "Property 'name' is missing" since we defined it as an optional property above
let idObject2: IOptional = {
    id: 1
};

console.log(JSON.stringify(idObject2, null, 3));


/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Weak Types
███████████████████████████████████████████████████████████████████████████████████████
*/

//typescript will detect an error even if we say all properties are optional, as seen below if we uncomment weakTypeNoOverlap
interface IWeakType {
    id?: number,
    name?: string
};

// let weakTypeNoOverlap: IWeakType = {
//     description: "a description"
// };


/*
███████████████████████████████████████████████████████████████████████████████████████
                                The "in" Operator
███████████████████████████████████████████████████████████████████████████████████████
*/

interface IIdName2 {
    id: number;
    name: string;
};

interface IDescrValue {
    descr: string;
    value: number;
};

function printNameOrValue(obj: IIdName2 | IDescrValue): void {
    if ('id' in obj) {
        console.log(`obj.name: ${obj.name}`);
    };
    if ('descr' in obj) {
        console.log(`obj.value: ${obj.value}`);
    };
};

printNameOrValue({
    id:1,
    name: "nameValue"
});

printNameOrValue({
    descr: "description",
    value: 2
});


/*
███████████████████████████████████████████████████████████████████████████████████████
                                        keyof
███████████████████████████████████████████████████████████████████████████████████████
*/

interface IGameRating {
    title: string;
    score: number;
};


/*iterate through the properties of a type and extract the names of its properties
NOTE that we are simply creating a string literal, the same thing as: 

type PersonPropertyLiteral = "id" | "name";
*/
type GameRating = keyof IGameRating;

/* ------------------------------------------

the console.log below ${value[key]} is just like the console.log here:

let GameObject = {
    title: "zelda",
    score: 10
};
console.log(GameObject["title"]);

------------------------------------------ */
function PrintGamePropertyValue(obj: IGameRating, key: GameRating, ) {
    console.log(`${obj[key]}`)
};

PrintGamePropertyValue({title: "Mariokart", score: 9}, "score");
PrintGamePropertyValue({title: "Megaman 64", score: 2}, "title");


/*
███████████████████████████████████████████████████████████████████████████████████████
                                        Classes
███████████████████████████████████████████████████████████████████████████████████████
a class is the definition of an object, what data it holds, and what operations it can perform. classes and interfaces form the cornerstone of OOP
*/

//we need to use a union type for id, otherwise we get a warning error because if we create an instance of this class, then it will be undefined
class SimpleClass {
    id: number | undefined;
    print(): void {
        console.log(`SimpleClass.print() called.`);
    };
    add(myNum: number): number {
        return myNum + 1;
    };
};

let mySimpleClass = new SimpleClass();

mySimpleClass.print();
console.log(mySimpleClass.add(5));


/*
███████████████████████████████████████████████████████████████████████████████████████
                                    the "this" keyword
███████████████████████████████████████████████████████████████████████████████████████
*/

//to access properties of a class, need to use "this" keyword
class SimpleClass2 {
    id: number | undefined;
    print(): void {
        console.log(`Simpleclass.id = ${this.id}`);
    };
};

let mySimpleClass2 = new SimpleClass2();

mySimpleClass2.id = 2020;
mySimpleClass2.print();


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Implementing Interfaces
███████████████████████████████████████████████████████████████████████████████████████
Interfaces are a type of contract that classes MUST implement, if they are expected to provide certain properties and behaviors
*/


//lets implement an interface that just cares about a class implementing a print function
interface IPrint {
    print(): void;
};


class ClassA implements IPrint {
    print(): void {
        console.log(`ClassA.print() called.`);
    };
};

class ClassB implements IPrint {
    print(): void {
        console.log(`ClassB.print() called.`);
    };
};

//add the function that takes the interface type as a parameter
function printClass(a: IPrint) {
    a.print();
};

//create an instance of each class above and then call the printClass() function and pass in the class as the argument, which runs their print function
let NewClassA = new ClassA();
let NewClassB = new ClassB();

printClass(NewClassA);
printClass(NewClassB);



//ducktyping enables all this below to still work without using the "implements" as used above in ClassA and ClassB
class ClassC {
    id: number | undefined;
    print(): void {
        console.log(`ClassC.print() called.`);
    };
};

let classC = new ClassC();
printClass(classC);


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Class Constructors
███████████████████████████████████████████████████████████████████████████████████████
class constructors can accept arguments during their initial construction, allowing us to combine the creation of a class and the setting of its parameters into a single line of code
*/

class ClassWithConstructor {
    id: number;
    constructor(_id: number) {
        this.id = _id;
    };
};

let classWithConstructor = new ClassWithConstructor(10);

console.log(`classWithConstructor = ${JSON.stringify(classWithConstructor)}`);

//NOTE we can use the same parameter name of "id" and it is fine, but is a bit confusing to me, so I would rather use a different name instead
class ClassWithConstructor2 {
    id: number;
    constructor(id: number) {
        this.id = id;
    };
};


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Class Modifiers
███████████████████████████████████████████████████████████████████████████████████████
public and private access modifiers to indicate whether a class variable or function can be accessed from outside the class itself
*/

//public
class ClassWithPublicProperty {
    public id: number | undefined;
};

let publicAccess = new ClassWithPublicProperty();

publicAccess.id = 10;

console.log(publicAccess.id);


//private
class ClassWithPrivateProperty {
    private id: number | undefined;
    constructor(_id: number) {
        this.id = _id;
    }
};

let privateAccess = new ClassWithPrivateProperty(20);

/*
this below now gives an error because id is private and accessible only within the class itself, so it cannot be modified outside of declaration, like above
*/

// privateAccess.id = 50;


/*
███████████████████████████████████████████████████████████████████████████████████████
                            JavaScript Private Fields
███████████████████████████████████████████████████████████████████████████████████████
another way to make something private via "#" symbol
*/

class ES6Private {
    #id: number | undefined;
    constructor(id: number) {
        this.#id = id;
    };
};

let es6Private = new ES6Private(30);

/*
this below gives an error just like when we created the private class in "Class Modifiers" above
*/

// es6Private.id = 40;


/*
███████████████████████████████████████████████████████████████████████████████████████
                        Constructor parameter properties
███████████████████████████████████████████████████████████████████████████████████████
shorthand version for access modifiers that can be applied to parameters in a constructor function
*/

class ClassWithCtorMods {
    constructor(public id: number, private name: string) {
    };
};

let myClassMod = new ClassWithCtorMods(1, "test");

console.log(myClassMod.id);

/*
this below gives an error because "name" is private
*/

// console.log(myClassMod.name);


/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Readonly
███████████████████████████████████████████████████████████████████████████████████████
much like const and means that once a value has been assigned to a readonly property, it is not allowed to be modified
*/

class ClassWithReadOnly {
    readonly name: string;
    constructor(_name: string) {
        this.name = _name;
    };
    /*
    the below function will give an error because we are allowing the change of the "readonly name: string" variable
    */

    // setNameValue(_name: string) {
    //     this.name = _name;
    // };
};


/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Get and Set
███████████████████████████████████████████████████████████████████████████████████████
using the same name for get and set(do NOT need to use the same name, it just makes it easier), it looks like we easily acccess and set the id of the property, but would not normally be possible since we do not use a constructor and the _id variable is private
*/

class ClassWithAccessors {
    private _id: number = 0;
    get id() {
        console.log(`get id property`);
        return this._id;
    };
    set id(value) {
        console.log(`set id property`);
        this._id = value;
    };
};

let classWithAccessors = new ClassWithAccessors();
//set id()
classWithAccessors.id = 10;
//get id()
console.log(`classWithAccessors.id = ${classWithAccessors.id}`);


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Static functions
███████████████████████████████████████████████████████████████████████████████████████
a class can mark a function with the static keyword, meaning that there will only be a single instance of this function available throughout the code base
*/

class StaticFunction {
    static printTwo() {
        console.log(`2`);
    };
};

//notice we do not need to create an instance of the class to call the function
StaticFunction.printTwo();


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Static properties
███████████████████████████████████████████████████████████████████████████████████████
much like static functions, classes can have static properties, so there will only be a single instance of this property throughout code base
*/

class StaticProperty {
    static count: number = 0;
    updateCount() {
        StaticProperty.count++
    };
};

let firstInstance = new StaticProperty();
let secondInstance = new StaticProperty();

//notice below how when we call updateCount() on both instances of the class, it affects the value of BOTH instances of the class. This is what a static property will do because there can only be a single instance of it throughout code base.
firstInstance.updateCount();
console.log(`StaticProperty.count = ${StaticProperty.count}`); //StaticProperty.count = 1

secondInstance.updateCount();
console.log(`StaticProperty.count = ${StaticProperty.count}`); //StaticProperty.count = 2


/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Namespaces
███████████████████████████████████████████████████████████████████████████████████████
when working within large projects, and large numbers of external libraries, there may come a time when two classes or interfaces share the same name. Namespaces help cater to this
*/

namespace FirstNameSpace {
    //export makes it available outside of the namespace itself
    export class NameSpaceClass {};
    class NotExported{};
};

let nameSpaceClass = new FirstNameSpace.NameSpaceClass();
/*
the below will error because we did not export the class from the namespace
*/

// let notExported = new FirstNameSpace.NotExported();


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Interface Inheritance
███████████████████████████████████████████████████████████████████████████████████████
*/

interface IBase {
    id: number;
};

interface IDerivedFromBase extends IBase {
    name: string;
};

//notice we have access to each property in both interfaces above, because IDerivedFromBase has both, therefore this class must implement both of those properties or we get an error
class IdNameClass implements IDerivedFromBase {
    name: string = "nameString";
    id: number = 36;
};



/*
███████████████████████████████████████████████████████████████████████████████████████
Interface Inheritance : Narrow a Type on a Derived Interface && Multiple Inheritance
███████████████████████████████████████████████████████████████████████████████████████
*/

interface IBaseStringOrNumber {
    score: string | number;
};

//id is now a string, not a string or number
interface IDerivedFromBaseStringOrNumber extends IBaseStringOrNumber {
    score: number;
};



/*
Interfaces also support MULTIPLE INHERITANCE, the below has all properties from both of the extended interfaces, so, (id, name, score, description), as seen in the mutipleInheritedObject class
*/
interface IMultiple extends IDerivedFromBase, IDerivedFromBaseStringOrNumber {
    description: string;
};

let multipleInheritedObject: IMultiple = {
    id: 1,
    name: "Megaman 2",
    score: 10,
    description: "Megaman 2 is bomb diggy, but 4 is amazing"
};

console.log(JSON.stringify(multipleInheritedObject));



/*
███████████████████████████████████████████████████████████████████████████████████████
                                Class Inheritance
███████████████████████████████████████████████████████████████████████████████████████
classes can also use the extends keyword to create an inheritance structure
*/

interface IBase2 {
    id: number;
};

interface IDerivedFromBase2 extends IBase2 {
    name: string;
}

//implementing the IBase2 interface, so all we need is the id: number
class MyBaseClass implements IBase2 {
    id: number = 0;
};

//extends MyBaseClass, which only extends IBase2, so when we implement IDerivedFromBase2, we now also must implement the name:string  (the extends MyBaseClass already has the id:number)
class DerivedFromMyBaseClass extends MyBaseClass implements IDerivedFromBase2  {
    name: string = "nameString";
};


/*
Classes can only inherit from one other class, but can inherit multiple interfaces
*/
interface IFirstInterface {
    id: number;
};

interface ISecondInterface {
    name: string;
};

//implements both the above interfaces and therefore must contaon both id and name properties
class MultipleInterfaces implements IFirstInterface, ISecondInterface {
    id: number = 1;
    name: string = "myName";
};


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Super Function
███████████████████████████████████████████████████████████████████████████████████████
when using inheritance, it is common for a base class and a derived class to implement the same method.
This is seen most often with class constructors.
If a derived class has a constructor, then this constructor must call the base class constructor with the SUPER keyword, or we will get an error.
*/

class BaseClassWithCtor {
    private id: number;
    constructor(_id: number) {
        this.id = _id;
    };
};

class DerivedClassWithCtor extends BaseClassWithCtor {
    private name: string;
    constructor(id: number, _name: string) {
        //using the passed in superid to target the extended class constructor
        super(id);
        this.name = _name;
    };
};

let testObject = new DerivedClassWithCtor(1, "Id derived from another class using SUPER");

console.log(JSON.stringify(testObject));

/*
//NOTE: even if a base class does not define a constructor function, if the derived class does define one, then the derived must call the "super()" with no arguments
*/
class BaseClassNoConstructor {
    private id: number = 1;
};

class DerivedFromNoConstructor extends BaseClassNoConstructor {
    private description: string;
    constructor(desc: string) {
        super();
        this.description = desc;
    };
};


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Function Overriding
███████████████████████████████████████████████████████████████████████████████████████
classes sharing a function name will override the base when called. we can still call the base using the super keyword
*/

class BaseClassWithFn {
    print(text: string) {
        console.log(`BaseClassWithFn.print() : ${text}`);
    };
};

class DerivedClassFnOverride extends BaseClassWithFn {
    print(text: string) {
        console.log(`DerivedClassFnOverride.print(${text})`);
    };
};

let derivedClassFnOverride = new DerivedClassFnOverride();
derivedClassFnOverride.print("test");


/*
we can still call the base print function using the super keyword
*/
class DerivedClassFnCallthrough extends BaseClassWithFn {
    print(text: string) {
        super.print(`from DerivedClassFnCallthrough: ${text}`);
    }
};

let derivedCallThrough = new DerivedClassFnCallthrough();
derivedCallThrough.print("text");



/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Protected
███████████████████████████████████████████████████████████████████████████████████████
classes can mark both properties and functions with the protected keyword, making it not accessible outside of the class itself, however is IS accessible to derived classes
*/

class BaseClassProtected {
    protected id: number;
    private name: string = "";
    constructor(id: number) {
        this.id = id;
    };
};

class AccessProtected extends BaseClassProtected {
    constructor(id: number) {
        super(id);
        //this is fine because it is accessible via protected
        console.log(`base.id = ${this.id}`);

        /*
        below gives an error because base.name is private
        */

        // console.log(`base.name = ${base.name}`);
    };
};

let accessProtected = new AccessProtected(1);
/*
errors because protected is only accessible within the class and subclasses
*/

// accessProtected.id = 2;

/*
errors because private is only accessible within the base class
*/

// accessProtected.name = "test";


/*
███████████████████████████████████████████████████████████████████████████████████████
                        Abstract Classes & Abstract Methods
███████████████████████████████████████████████████████████████████████████████████████
an abstract class is a class that cannot be instantiated, it is a class that is meant to be derived from. The purpose is to generally provide a set of basic properties or functions that are shared accross a group of classes
*/

abstract class RobotMaster {

    fight(): void {
        console.log(`${this.getname()}attacks with ${this.getSpecialAttack()}`);
    };

    //we do not have {} for these functions because they cannot have an implementation using abstract
    abstract getname(): string;
    abstract getSpecialAttack(): string;
};

class ToadMan extends RobotMaster {
    getSpecialAttack(): string {
        return "Storm Rain ";
    };

    getname(): string {
        return "Toad Man ";
    };
};

const toadMan = new ToadMan();

toadMan.fight();

/*
the below will error because we cannot instantiate an abstract class
*/

//const ToadMan = new RobotMaster();


/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Instanceof
███████████████████████████████████████████████████████████████████████████████████████
detect whether an object is an instance of a class or whether it has been derived from a particular class
*/

class A {};
class BfromA extends A {};
class CfromA extends A {};
class DfromC extends CfromA {};

//true cases
console.log(`A instance of A: ${new A() instanceof A}`);
console.log(`BfromA instance of A: ${new BfromA() instanceof A}`);
console.log(`BfromA instance of BfromA: ${new BfromA() instanceof BfromA}`);

//false case
console.log(`CfromA instance of BfromA: ${new CfromA() instanceof BfromA}`);

//check the results of inheriting from a class that inherits from another class (true cases)
console.log(`DfromC instance of CfromA: ${new DfromC() instanceof CfromA}`);
console.log(`DfromC instance of A: ${new DfromC() instanceof A}`);


/*
███████████████████████████████████████████████████████████████████████████████████████
                            Interfaces extending classes
███████████████████████████████████████████████████████████████████████████████████████
an interface can derive from a class definition
*/

class BaseInterfaceClass {
    id: number = 0;
    print() {
        console.log(`this.id = ${this.id}`);
    };
};

interface IBAseInterfaceClassExtends extends BaseInterfaceClass {
    setId(id: number): void;
};

class ImplementsExt extends BaseInterfaceClass implements IBAseInterfaceClassExtends {
    setId(id: number): void {
        this.id = id;
    };
};

/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Modules
███████████████████████████████████████████████████████████████████████████████████████
Modularization is a popular technique used in programming languages that allows programs to be built from a series of smaller libraries, or modules
*/


console.log(addNumbers(2, 2));




























export {}