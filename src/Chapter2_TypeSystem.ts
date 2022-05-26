
let myString :string = `Chapter 2`;
console.log(`Hello ${myString} TypeScript`);

/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Any type
███████████████████████████████████████████████████████████████████████████████████████
*/

let item1: any = {
    id: 1,
    name: "One"
};

item1 = {
    id: 2
};


//explicit casting, accomplishes same as above
let item2 = {
    id: 2,
    name: "Two"
} as any;

item2 = {
    id: 3
};


//another letient of casting technique, uses the 'as' keyword
let item3 = {
    id: 3,
    name: "Three"
} as any;

item3 = {
    id: 4
};


//the let keyword. if we used var, we would console.log 2, 2 because the var index: number = 2 is overwriting the index variable at the global level
let index: number = 0;

if (index === 0) {
    let index: number = 2;
    console.log(`index = ${index}`)
}

console.log(`index = ${index}`);


const constValue = "const value";


/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Union types
███████████████████████████████████████████████████████████████████████████████████████
*/

function printObject(obj: string | number): void {
    console.log(`obj = ${obj}`);
};

printObject(1);
printObject("String value");


//Type guards using typeof
function addWithTypeGuard(arg1: string | number, arg2: string | number): string | number {
    if (typeof arg1 === "string") {
        //arg1 is treated as a string
        console.log(`arg1 is of type string`);
        return arg1 + arg2;
    } else if (typeof arg2 === "string") {
        //arg2 is treated as a string
        console.log(`arg2 is of type string`);
        return arg1 + arg2;
    } else if (typeof arg1 === "number" && typeof arg2 === "number") {
        //both are numbers
        console.log(`arg1 and arg2 are numbers`);
        return arg1 + arg2;
    } else {
        console.log(`default return treat both as strings`);
        return arg1.toString() + arg2.toString();
    };
};


console.log(` "1", "2" = ${addWithTypeGuard("1", "2")}`);
console.log(` 1, 2 = ${addWithTypeGuard(1, 2)}`);
console.log(` 1, "2" = ${addWithTypeGuard(1, "2")}`);


/*
███████████████████████████████████████████████████████████████████████████████████████
Type alias, can create a named type that can be used as a substitute for a type union. Can be used wherever normal types are used
███████████████████████████████████████████████████████████████████████████████████████
*/

type stringOrNumber = string | number;

function addWithTypeAlias(arg1: stringOrNumber, arg2: stringOrNumber) {
    return arg1.toString + arg2.toString();
};


/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Enums
███████████████████████████████████████████████████████████████████████████████████████
*/

enum DoorState {
    Open,
    Closed
};

function checkDoorStatus(state:DoorState): void {
    console.log(`Enum number value is equal to ${state}`);
    switch(state) {
        case DoorState.Open: {
            console.log(`Door is open`);
            break;
        };
        case DoorState.Closed: {
            console.log(`Door is closed`);
            break;
        };
    };
};

checkDoorStatus(DoorState.Open);
checkDoorStatus(DoorState.Closed);


//we can set the numeric value to whatever we want for enums, they normally start from 0 like an array
enum DoorStateSpecificValues {
    Open = 3,
    Closed = 7,
    Unspecified = 256
};


//we can also set the value to be strings for the enums
enum DoorStateString {
    Open = "Open",
    Closed = "Closed"
};

console.log(`DoorStateString.Open = ${DoorStateString.Open}`);



//const enums
const enum DoorStateConst {
    Open = 10,
    Closed = 15
};

console.log(`const Closed = ${DoorStateConst.Closed}`);


/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Undefined
███████████████████████████████████████████████████████████████████████████████████████
*/

let array = ["123", "456", "789"];

delete array[0];

for (let i = 0; i < array.length; i++) {
    console.log(`array [${i}] = ${array[i]}`);
};

//outputs array [0] as undefined because we deleted it


//We can use the undefined type to explicitly state that a variable could be undefined, as follows:
function checkAndPrintElement(arrayElement: string | undefined): void {
    if (arrayElement === undefined) {
        console.log(`invalid array element`);
    } else {
        console.log(`valid array element: ${arrayElement}`);
    };
};

for (let i = 0; i < array.length; i++) {
    checkAndPrintElement(array[i]);
};


/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Null
███████████████████████████████████████████████████████████████████████████████████████
*/

function printValues(a: number | null): void {
    console.log(`a = ${a}`);
};

printValues(1);
printValues(null);


/*
███████████████████████████████████████████████████████████████████████████████████████
conditional expressions - a shorter version of if else else if
(conditional) ? (true statement) : (false statement)
███████████████████████████████████████████████████████████████████████████████████████
*/

const gamesPlayed: number = 1028;

const MasterMessage: string = gamesPlayed > 1000 ? "You are master gamer" : "You are nub gamer";

//if else if else version of same conditional expression above
function MasterMessage1(): string {
    if (gamesPlayed > 1000) {
        return "You are master gamer";
    } else {
        return "You are noob gamer"
    };
};

console.log(MasterMessage);


let objectA = {
    nestedProperty: {
        name: "nestedPropertyName"
    }
};

function printNestedObject(obj: any): void {
    if (obj != undefined && obj.nestedProperty != undefined && obj.nestedProperty.name != undefined) {
        console.log(`name = ${obj.nestedProperty.name}`)
    } else {
        console.log(`name not found or undefined`)
    }
};

printNestedObject(objectA);


/*
███████████████████████████████████████████████████████████████████████████████████████
optional chaining - same as above printNestedObject, except instead of a long if statement, we use ? after each check. If any one of the nested properties returns null or undefined, the entire statement will return undefined
███████████████████████████████████████████████████████████████████████████████████████
*/

function printNestedOptionalChain(obj: any): void {
    if (obj?.nestedProperty?.name) {
        console.log(`name = ${obj.nestedProperty.name}`)
    } else {
        console.log(`name not found or undefined`);
    };
};

printNestedOptionalChain(undefined);
printNestedOptionalChain({
    aProperty: "another property"
});
printNestedOptionalChain({
    nestedProperty: {
        name: null
    }
});
printNestedOptionalChain({
    nestedProperty: {
        name: "nestedPropertyName"
    }
});


/*
███████████████████████████████████████████████████████████████████████████████████████
                            Nullish coalescing operator   ??
███████████████████████████████████████████████████████████████████████████████████████
*/

function nullishCheck(a: number | null | undefined): void {
    console.log(`a: ${a ?? `null or undefined`}`);
};

nullishCheck(1);
nullishCheck(null);
nullishCheck(undefined);


/*
███████████████████████████████████████████████████████████████████████████████████████
                            Null or undefined operands
███████████████████████████████████████████████████████████████████████████████████████
*/

function testNullOperands(a: number, b: number | null | undefined): void {
    let addResult = a + (b ?? 0);
    console.log(addResult);
};

testNullOperands(1, null);
testNullOperands(2, undefined);
testNullOperands(3, 1);


/*
███████████████████████████████████████████████████████████████████████████████████████
                            Definite assignment
Typescript will give us an error if we use a variable before it is defined, but JavaScript will not. Uncomment below to see error
███████████████████████████████████████████████████████████████████████████████████████
*/

// console.log(`lValue = ${lValue}`);
// let lValue = 2;

/*
our below code will work fine, but we get the error: Variable "globalString" is used before being assigned.
can use it in the variable declaration or where we call for the variable in the console.log
*/
let globalString!: string;

setGlobalString("this string is set");

console.log(`global string = ${globalString!}`);

function setGlobalString(value: string): void {
    globalString = value;
};


/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Object
███████████████████████████████████████████████████████████████████████████████████████
*/

let structuredObject = {
    name: "myObject",
    properties: {
        id: 1,
        type: "AnObect"
    }
};

function printObjectType(a: object): void {
    console.log(`a: ${JSON.stringify(a)}`);
};

printObjectType(structuredObject);


/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Unknown
                        type safe version of the "any" type
███████████████████████████████████████████████████████████████████████████████████████
*/

//this is oddly allowed since a is of type any...
let a: any = "test";
let aNumber: number = 2;
aNumber = a;
console.log(aNumber); //"test"

//safer to use unknown type,below gives us the error: Type 'unknown' is not assignable to type 'number'
//to fix this, we need to cast an unknown type to another primitive type
let u: unknown = "an unknown";
u = 1;
let aNumber2: number;
aNumber2 = <number>u;
console.log(aNumber2)


/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Never
███████████████████████████████████████████████████████████████████████████████████████
*/

// function alwaysThrows(): never {
//     throw new Error("this will always throw");
//     //this return never executes, because once an error is thrown, no other code afterwards is ran. Adding type never will show us an error in the console, without it, there is no error and is simply never ran
//     return -1;
// };


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Never and Switch
███████████████████████████████████████████████████████████████████████████████████████
*/

enum AnEnum {
    FIRST,
    SECOND
};

//comment out the second case to get the error (Type 'AnEnum' is not assignable to type 'never'). WHen using never in a switch, you need to provide every case possibly inside the Enum being used?
function getEnumValue(enumValue: AnEnum): string {
    switch(enumValue) {
        case AnEnum.FIRST: {
            return "First Case";
        };
        case AnEnum.SECOND: {
            return "Second Case";
        };
    };
    let returnValue: never = enumValue;
    return returnValue;
};

console.log(getEnumValue(AnEnum.FIRST));



/*
███████████████████████████████████████████████████████████████████████████████████████
                                Object Spread
███████████████████████████████████████████████████████████████████████████████████████
*/

let firstObj: object = {
    id: 1,
    name: "firstObj"
};

let secondObj: object = {
    ...firstObj
};

console.log(`secondObj: ${JSON.stringify(secondObj)}`);


//combine multiple objects together
let nameObj: object = {
    name: "nameObj name"
};

let idObj: object = {
    id: 1
};

let obj3 = {
    ...nameObj, ...idObj
};

console.log(`obj3 = ${JSON.stringify(obj3)}`);



/*
███████████████████████████████████████████████████████████████████████████████████████
                                Spread Precedence
███████████████████████████████████████████████████████████████████████████████████████
*/

let objPrec1: object = {
    id: 1,
    name: "obj1 name"
};

let objPrec2: object = {
    id: 1001,
    desc: "obj2 description"
};

let obj3Prec: object = {
    ...objPrec1, ...objPrec2
};

console.log(JSON.stringify(obj3Prec, null, 4));


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Spread with arrays
███████████████████████████████████████████████████████████████████████████████████████
*/

let spreadArray1: number[] = [1, 2, 3];

let spreadArray2: number[] = [3, 4, 5];

let spreadArray3: number[] = [...spreadArray1, ...spreadArray2];

console.log(spreadArray3);

//spread syntax can appear in any order

let objArray1: object[] = [
    {
        id:1,
        name: "first element"
    }
];

let objArray2: object[] = [
    {
        id: 2,
        name: "second element"
    }
];

let objArray3: object[] = [
    ...objArray1, 
    {id: 3, name: "third element"}, 
    ...objArray2
];

console.log(JSON.stringify(objArray3), null, 4);


/*
███████████████████████████████████████████████████████████████████████████████████████
                                        Tuples
███████████████████████████████████████████████████████████████████████████████████████
*/

let tuple1: [string, boolean];

tuple1 = ["test", true];

//below gives an error, because we must provide ALL properties defined to the tuple, and we are missing the boolean
// tuple1 = ["test"];


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Tuple Destructuring
███████████████████████████████████████████████████████████████████████████████████████
*/

//simple array destructuring syntax
console.log(tuple1[0]);
console.log(tuple1[1]);

//array syntax to create an array of named elements
let [tupleString, tupleBoolean] = tuple1;

console.log(tupleString);
console.log(tupleBoolean);


/*
███████████████████████████████████████████████████████████████████████████████████████
                            Optional Tuple Elements
███████████████████████████████████████████████████████████████████████████████████████
*/

let tupleOptional: [string, boolean?];

tupleOptional = ["test", true];
tupleOptional = ["test"];

console.log(tupleOptional[0]);
//returns undefined because we have it set to optional with the "?" in the declaration above
console.log(tupleOptional[1]);

/*
███████████████████████████████████████████████████████████████████████████████████████
                            Tuples and Spread Syntax
███████████████████████████████████████████████████████████████████████████████████████
*/

//defining a tuple to have a variable number of elements
let tupleRest: [number, ...string[]];

tupleRest = [1];
tupleRest = [1, "string"];
//can add any number of strings since we used spread in the tuple declaration above
tupleRest = [1, "string1", "string2"];


/*
███████████████████████████████████████████████████████████████████████████████████████
                            Object Destructuring
███████████████████████████████████████████████████████████████████████████████████████
*/

let complexObject = {
    aNum: 1,
    bStr: "name",
    cBool: true
};

let { aNum, bStr, cBool } = complexObject;

console.log(aNum); //1
console.log(bStr); //"name"
console.log(cBool); //true

//can also rename the variables during destructuring, note that the ":" symbol here is not used to defined a type, but to rename
let { aNum: objId, bStr: objName, cBool: isValid } = complexObject;

console.log(objId); //1
console.log(objName); //"name"
console.log(isValid); //true


/*
███████████████████████████████████████████████████████████████████████████████████████
                            Functions - Optional Parameters
███████████████████████████████████████████████████████████████████████████████████████
*/

//optional parameters MUST come last
function concatValues(a: string, b?: string): void {
    console.log(`a + b = ${a + b}`);
};

concatValues("first", "second");
concatValues("third");


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Default Parameters
███████████████████████████████████████████████████████████████████████████████████████
*/

function concatWithDefault(a: string, b: string = "default1") {
    console.log(`a + b = $${a + b}`);
};

concatWithDefault("first", "second");
concatWithDefault("third");


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Rest Parameters
███████████████████████████████████████████████████████████████████████████████████████
*/

//we can still pass parameters to a function that does not have them defined, to do this in typescript without an error, we needs to use REST SYNTAX "...args: string[] | number[]"
//need to use the "arguments" variable that all functions have access to in order to use this

//REST syntax is the string[] and number[] argumenters, can also use boolean[], etc
function testArguments(...args: string[] | number[]) {
    for(let i = 0; i < arguments.length; i++) {
        console.log(`argument [${i}] = ${arguments[i]}`);
    };
};

testArguments(1, 2);
testArguments("first", "second", "third");


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Function Callbacks
███████████████████████████████████████████████████████████████████████████████████████
*/

let iAmACallback = function(callbackMessage: string): void {
    console.log(`Callback message equals: ${callbackMessage}`);
};

function printCallback(callbackMessage: string, callBackFunction: (message: string) => void): void {
    console.log("Not the callback function, just a console log before the callback function, below is the callback function");
    if(typeof(callBackFunction) == "function") {
        callBackFunction(callbackMessage);
    } else {
        console.log("second argument must be a function");
    };
};

printCallback("CLYDE FRAWWWG", iAmACallback); //Callback message equals: CLYDE FRAWWWG


/*
███████████████████████████████████████████████████████████████████████████████████████
Function Signatures as Parameters (how to make sure the argument is always of type function with proper return value)
███████████████████████████████████████████████████████████████████████████████████████
*/

function myCallBack(text: string): void {
    console.log(`my callBack called with ${text}`);
};

//making sure this function only accepts a function as a parameter by using the => syntax with callbackFn parameter
function withCallbackArg (message: string, callbackFn: (text: string) => void) {
    console.log(`withCallback called, message : ${message}`);
    callbackFn(`${message} from with CallBack`);
};

withCallbackArg("hello there", myCallBack);

//below gives error now of: "Argument of type 'string' is not assignable to parameter of type '(text: string) => void'."

// withCallbackArg("text", "this is not a function");


/*
███████████████████████████████████████████████████████████████████████████████████████
                                Function Overrides
███████████████████████████████████████████████████████████████████████████████████████
*/

//alternative to union types when defining a function and allows a function signature to provide different parameter types

function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: any, b: any) {
    return a + b;
};

add("first", "second");
add(1, 2);
//below will error because it is not of type string or number

// add(true, false);


/*
███████████████████████████████████████████████████████████████████████████████████████
                                    Literals
███████████████████████████████████████████████████████████████████████████████████████
*/

//a hybrid of enums and type aliases. A literal will limit the allowed values to a set of values specified

type AllowedStringValues = "one" | "two" | "three";
type AllowedNumericValues = 1 | 20 | 100;

function withLiteral(input: AllowedNumericValues | AllowedStringValues) {
    console.log(`called with ${input}`);
};

withLiteral("one");
withLiteral(20);

//the below will error because it is not one of the allowed values declared in the literals above

// withLiteral("four");
// withLiteral(2);























































export {}