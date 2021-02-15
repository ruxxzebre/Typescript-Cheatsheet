export default {}; // trap for `--isolatedModules` compilation error

/* Declaring variables with types */
let num: number;
const numc: number = 6;

/* ENUM */ 

// By default: Red - 0, Green - 1, Blue - 2, Purple - 3
enum Color {
  Red, Green, Blue, Purple
}
let backgroundColor;
backgroundColor = Color.Red;

// Predifined
enum Locals {
  UA = 'ua-uk',
  RU = 'ru-ru',
  EN = 'en-us'
}

/* Type assertions */ 

// Has any type, if not predefined
let message; 
message = 'Hi!';

// Has implicitly defined 'string' type
let color = 'red';

// Has explicity defined 'number' type
let yo: number;

// When type is not any, type cheking will work, even with implicit type (obviously)
yo = 200; // Works fine

// yo = '2432'; // Type 'string' is not assignable to type 'number'
// color = 665113 // Type 'number' is not assignable to type 'string'

// NOTE: with type 'any' intellisense could behave the way we want it to
// But! It's possible to tell the typescript's language server and compiler to treat variable as certain type
let fineMessage = (<string>message).startsWith('H'); // Intellisense gives us list of available properties
let reallyFineMessage = (message as string).startsWith('H'); // Alternative to <T>variable
let implicitNumb = 616;

(<number>implicitNumb).toExponential(); // Works fine! (toExponenial is exists for 'number' type)
// (<string>message).toExponential(); // Property 'toExponential' does not exist on type 'string'.

/* Interfaces */
interface Frontend {
  locale: Locals; // enum
  backgroundColor: Color; // enum too
  url: string;
  title: string;
  isPWA: boolean;
  bundleSize: number;
  hasAds?: boolean; // optional property
}

// Match object with predefined interface
// So interface works as contract for object
// or, defines a shape of the object
const ExampleSite: Frontend = {
  locale: Locals.EN,
  backgroundColor: Color.Red,
  url: 'http://www.example.com',
  title: 'Example',
  isPWA: true,
  bundleSize: 234234
};

// We can specify type of argument in functions or methods by 
// typing interface, class, enum, or just specification that object should match with
// Now you can be sure that passed object will always have necessary fields

// Without interfaces we can strict object's props like this
function calcAge(user: { name: string, birthday: number }): number {
  return (new Date).getFullYear() - user.birthday;
}

// With interfaces
function ChangeColor(site: Frontend, color: Color) {
  return { ...site, color };
}

/* Types */ 

// The main differences between types and interfaces is:
// 1) You can use only types to alias primitive types
// 2) You can declare tuples with types (but not for interfaces)
// 3) You can declare types only once per scope

// You can read more about type-vs-interface here: https://dev.to/stereobooster/typescript-type-vs-interface-2n0c
type PointsExample = {
  startingPoint: { x: number, y: number };
  endingPoint: { x: number, y: number };
}

/* Classes */

// Cohesion concept from OOP - things that are related, should be part of one unit, go together.
interface Point {
  x: number;
  y: number;
}
interface Segment {
  startingPoint: Point;
  endingPoint: Point;
}

// So here we violated cohesion principle, the function below is highly related to Segment
// so why won't we use them together?
let manhattanDistance = (segment: Segment): number => {
  return Math.abs(segment.startingPoint.x - segment.endingPoint.x) 
        - Math.abs(segment.startingPoint.y - segment.endingPoint.y);
}

// Vector boi
interface Vector {
  characteristics: number[];
  calcVector(startingPoint: Point, endingPoint: Point): number[];
}

// Now we can use Vector object, and manipulate with data using methods
// Or define private method for inner workings
class Vector implements Vector { // class Vector implements Vector interface, so it's required to have defined props
  characteristics: number[];
  private multiplier = 1; // private access modifier, so the method or prop is accessible only in current class, not outside nor inheritors

  constructor(startingPoint: Point, endingPoint: Point) {
    this.characteristics = this.calcVector(startingPoint, endingPoint);
  }

  public manhattanDistance(startingPoint: Point, endingPoint: Point): number { // public access modifier (every prop or method is public by default)
    return Math.abs(startingPoint.x - endingPoint.x) 
          - Math.abs(startingPoint.y - endingPoint.y);
  }

  calcVector(startingPoint: Point, endingPoint: Point): number[] {
    return [
      startingPoint.x - endingPoint.x,
      startingPoint.y - endingPoint.y
    ];
  }

  protected calcLength(): number { // protected access modifier, works as private, but prop is accessible for inheritors
    return Math.sqrt(this.characteristics.reduce((acc, curr) => acc += curr*curr, 0));
  }
}

// TIP: Shortcut for field initializing
// You can do like this:
class Fish {
  name: string;
  speed: number; 

  constructor(name: string, speed: number) {
    this.name = name;
    this.speed = speed;
  }
}

// But also like this:
class Warrior {
  // initialize fields with arguments like a bo$$
  constructor(private name: string, private weapon: string) {} // Fast and handy, right?

    // Fast Getters and Setters
    get sound() {
      return this.sound;
    }
  
    set sound(sound: string) {
      this.sound = sound;
    }
}

// Initializing object
const sPoint: Point = { x: 1, y: 2 };
const ePoint: Point = { x: 1, y: 3 };
const eMeow: Vector = new Vector({ x: 1, y: 2 }, { x: 1, y: 3 });
const iMeow = new Vector({ x: 1, y: 2 }, { x: 1, y: 3 }); // nothing wrong to type it implicitly
