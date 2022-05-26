import * as inquirer from 'Inquirer';

let myString :string = `ES6`;
console.log(`Hello ${myString} TypeScript`);

let myBoolean : boolean = true;
let myNumber : number = 1234;
let myStringArray: string[] = [`first`, `second`, `third`];

myBoolean = (myNumber === 456);
myStringArray = [myNumber.toString(), '5678'];
myNumber = myStringArray.length;

console.log(`myBoolean = ${myBoolean}`);
console.log(`myStringArray = ${myStringArray}`);
console.log(`myNumber = ${myNumber}`);

let nameAndIdObject = { 
    name: `Tyler`, 
    id: 1, 
    print() {

    }
};

nameAndIdObject = { 
    id: 2, 
    name: `Alex`,
    print() {

    }
};

/**This comment now shows up for this function whenever you hover it after instantiating it */
function calculate (a:number, b:number, c:number): number {
    return (a * b) + c;
};


console.log(`calculate() = ${calculate(2, 3, 1)}`);


function printString (message: string) : void {
    console.log(message);
};

let returnedMessage = printString('I am a message');


inquirer.prompt(
    [
        {
            name: "weapon",
            message: "what is your weapon of choice ?"
        }
    ]
).then(answers => {
    console.log(`you answered : ${answers.weapon}`);
});