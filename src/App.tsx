import React from 'react';
import './App.css';

interface NewType {
  message: string;
};

function MyMessage(props: NewType) {
  return <div>{props.message}</div>;
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <MyMessage message = {"Chapter 4"}/>
        </p>
      </header>
    </div>
  );
};

export default App;

/*
███████████████████████████████████████████████████████████████████████████████████████
                                        Generics
███████████████████████████████████████████████████████████████████████████████████████
*/

function printGeneric<T>(value:T) {
  console.log(`Typeof T is: ${typeof(value)}`);
  console.log(`Value is ${value}`);
};

printGeneric(1);
printGeneric("test");
printGeneric(true);
printGeneric(() => {});
printGeneric({id:1});

printGeneric<string>("typecasted as string");

////below errors because it is not of type string

// printGeneric<string>(1);


/*
███████████████████████████████████████████████████████████████████████████████████████
                              Multiple Generic Types
███████████████████████████████████████████████████████████████████████████████████████
*/

function usingTwoTypes<A, B>(first: A, second: B) {
};

//using explicit type casting to set to number, string
usingTwoTypes<number, string>(1, "test");
//ts is inferring our types of number, string
usingTwoTypes(1, "test");
usingTwoTypes<boolean, boolean>(true, false);
usingTwoTypes("first", "second");


/*
███████████████████████████████████████████████████████████████████████████████████████
                          Constraining the type of T
███████████████████████████████████████████████████████████████████████████████████████
*/

class Concatenator<T extends Array<string> | Array<number>> {
  public concatenateArray(items: T): string {
      let returnString = "";
      for(let i = 0; i < items.length; i++) {
          returnString += i > 0? "," : "";
          returnString += items[i].toString();
      };
      return returnString;
  };
};
