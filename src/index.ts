let example: any;

// (i: number) => void; - annotation
// (i: number) => console.log(`i${i}`); - function
const logNumber: (i: number) => void = (i: number) => {
  console.log(`i${i}`);
};

// declare a type helps us work with the variable
// eslint-disable-next-line quotes
const coordinates: { x: number; y: number } = JSON.parse('{"x":10,"y":20}');

// declare (<variable types>): <result type> => {}
const add = (a: number, b: number): number => a + b;

function multiply(a: number, b: number): number {
  return a * b;
}

const divide = function (a: number, b: number): number {
  return a / b;
};

// different ways to declare a type as a function
type Add1 = (a: number, b: number) => number;
type Add2 = {
  (a: number, b: number): number;
};
interface Add3 {
  (a: number, b: number): number;
}

const add1: Add1 = (a, b) => a + b;
const add2: Add2 = (a, b) => a + b;
const add3: Add3 = (a, b) => a + b;

// difference between any and unknown types

// any allows to use the variable like any type we want
const anyExample: any = 123;
// thats why we can assign any variable to boolean variable
const anySetBoolean: boolean = anyExample;

const unknownExample: unknown = 123;
// @ts-ignore
let unknownSetBoolean: boolean = unknownExample; // Error. unknown is not assignable to another type

if (typeof unknownExample === "boolean") {
  // but we can work with unknown inside "if (typeof)" block
  unknownSetBoolean = unknownExample;
}

// or fix it with 'as' assertion
// 'as' does not convert a variable. it just assign a type for TS compiler
const unknownAsBooleanSetBoolean: boolean = unknownExample as boolean;
const unknownAsBooleanSetBoolean2: boolean = <boolean>unknownExample; // another way to assert type

// functions declared as void expect undefined as result
const und = (): void => undefined;
// const nu = (): void => null; // it doesn't works

// type never means throwing error or infinity loop
const throwError = (message: string) => {
  throw new Error(message);
};
const infinityLoop = (message: string) => {
  while (true) {
    console.log(message);
  }
};

// Union types
type Wolf = {
  kind: "wolf";
  name: "Akela";
};
type Lion = {
  kind: "lion";
  name: "Aslan";
};

type Predator = Wolf | Lion;

const namePredator = (p: Predator) => {
  if (p.kind === "wolf") {
    // here we works with "Wolf" type
    return `Wolf is ${p.name}`;
  }

  // try to comment this case
  if (p.kind === "lion") {
    // here we works with "Lion" type
    return `Lion is ${p.name}`;
  }

  // as we finished working with all types, p: never
  // but if we refactor code and extend Predator type with new one ('Shark' for instance)
  // this check will remind us to handle this case too
  const _ensureAllTypesAreHandled: never = p;
  return _ensureAllTypesAreHandled;
};

// moreover we can define functions returning boolean values
// and define their result like a type check:
const isLion = (predator: Predator): predator is Lion =>
  predator.kind === "lion";

const isWolf = (predator: Predator): predator is Wolf =>
  predator.kind === "wolf";

const advancedNamePredator = (p: Predator) => {
  if (isWolf(p)) {
    return `Wolf is ${p.name}`;
  }

  if (isLion(p)) {
    return `Lion is ${p.name}`;
  }
  const _ensureAllTypesAreHandled: never = p;
  return _ensureAllTypesAreHandled;
};

// destructuring
const todayWeather = {
  day: new Date(),
  weather: "sunny",
};

// we destructure the (weather: { day: Date, weather: string })
const logWeather = ({ day, weather }: { day: Date; weather: string }): void => {
  console.log("🖨️ ~ logWeather ~ day", day);
  console.log("🖨️ ~ logWeather ~ weather", weather);
};

const profile = {
  name: "Ivan",
  age: 26,
  setAge(age: number): void {
    this.age = age;
  },
};

// const { age }: number  = profile; this declaration is not correct
const { age }: { age: number } = profile; // this is correct

// Tuple
type Drink = [color: string, carbonized: boolean, sugar: number];

const pepsi: Drink = ["brown", true, 40];
const sprite: Drink = ["clear", true, 20];
sprite[0] = "white";

// base js approach of class definition
class Car {
  color: string; // define class field

  constructor(color: string) {
    this.color = color; // initiate value
  }

  // public, private and protected are features of ts
  // accessible  method everywhere
  public beep(): void {
    console.log("beep");
  }

  // accessible only in this class, but not in children
  private boop(): void {
    console.log("boop");
  }

  // accessible in this class and in its children
  protected baap(): void {
    console.log("baap");
  }
}

class Vehicle {
  // shorten definition
  constructor(public color: string) {} // === this.color = color
}

class AnotherCar extends Vehicle {
  // as we inherit 'color' property from Vehicle class,
  // we do not have to write any 'private' or 'public' properties
  // before because they are defined in Vehicle class
  constructor(public wheel: number, color: string) {
    super(color);
  }
}

class NumberCollection {
  constructor(public collection: number[]) {}

  // get helps us to use NumberCollection.length instead of NumberCollection.length()
  get length(): number {
    return this.collection.length;
  }

  lengthFunc(): number {
    return this.collection.length;
  }
}

const collection = new NumberCollection([1, 2, 3]);
example = collection.length === collection.lengthFunc(); // true

// abstract  class helps us to describe some methods in parent class
// TS does not allow us to make an instance of abstract
abstract class Painter {
  // we  define that non-abstract children of this class will have that properties
  abstract color: string;

  public paint(newColor: string): void {
    this.color = newColor;
  }
}

class Ship extends Painter {
  constructor(public color: string) {
    // we have to use supe because this class has a parent
    super();
  }
}

class Bus extends Painter {
  constructor(public color: string) {
    super();
  }
}

// ENUM
const GlovesObj = {
  s: "12 oz",
  m: "16 oz",
  l: "20 oz",
};

// enum works almost like normal object GlovesObj
// we should use enum to represent small pieces of data structures like that
enum Gloves {
  s = "12 oz",
  m = "16 oz",
  l = "20 oz",
}

// it is not good example but I have no another idea
// we declare that GlovesHelper returns
// one of three values: "12 oz", "16 oz" or "20 oz"
const GlovesHelper = (size: string): Gloves => {
  switch (size) {
    case "small":
      return Gloves.s;
    case "medium":
      return Gloves.m;
    default:
      return Gloves.l;
  }
};

// Function declaration in the interface
interface IFunction {
  (argument: string): void;
}

// generic type allows us to use any type we want
// it works like arguments in function or class definition
// commonly held to use T like TypeOfAnythingWeUseHere
class Store<T> {
  constructor(public data: T) {}
}

const storeNumber = new Store<number>(2);
const storeString = new Store<string>("two");
// ts is intelligent enough to predict type
const storeAnything = new Store("anything"); // const storeAnything: Store<string>

// firstly declare T then use it with variable
function printAnything<T>(arrayOfSomething: T[]) {
  for (const item of arrayOfSomething) {
    console.log(item);
  }
}

// T constrains
class Thief {
  public attack(): void {
    console.log("Attack with a knife");
  }
}

class Mage {
  public attack(): void {
    console.log("Attack with a spell");
  }
}

interface AttackAble {
  attack(): void;
}

// declare that T is not a simple type like string or number
// T has to have interface in this case
function attackSomeone<T extends AttackAble>(char: T) {
  char.attack();
}

// two types of workflow with classes

// Inheritance
abstract class ClassA {
  method1: any;

  abstract method2: any;
}

// in ClassB we use both method1 and method2
class ClassB extends ClassA {
  constructor() {
    super();
  }

  method2: any;
}

// Composition
class ClassC {
  method1: any;
}

// in ClassD we use both classCInstance.method1 and method2
class ClassD {
  constructor(public classCInstance: ClassC) {}

  method2: any;
}

// Example of functional composition
const canDefend = (state: { name: string; hp: number }) => ({
  defend: () => {
    console.log(`${state.name} defends you`);
    state.hp -= 1;
  },
});

const canHeal = (state: { name: string; hp: number }) => ({
  heal: () => {
    console.log(`${state.name} heals himself`);
    state.hp += 1;
  },
});

const becomeAPaladin = (state: { name: string; hp: number }) => {
  Object.assign(state, canDefend(state), canHeal(state));
};

const newCharacter: any = {
  name: "Aegis",
  hp: 10,
};
// { name: 'Aegis', hp: 10 }
becomeAPaladin(newCharacter);
// { name: 'Aegis', hp: 10, defend: [Function: defend], heal: [Function: heal] }

// newCharacter.defend(); // Aegis defends you
// newCharacter.heal(); // Aegis heals himself

interface IWorker {
  fix(issue: string): boolean;
}

class Plumber implements IWorker {
  public money: number = 0;

  constructor(public name: string, private preferredBoilerModel: string) {}

  // class Plumber has to have fix method as it implements IWorker
  fix(boiler: string) {
    console.log(
      `My name is ${this.name} and I can fix only "${this.preferredBoilerModel}" boilers`
    );

    return boiler === this.preferredBoilerModel;
  }

  // nevertheless it can have any other methods
  earn(salary: number) {
    this.money += salary;
  }
}
/**
 * @param str sting we want to check
 * @returns true if str is palindrome, false otherwise
 */
function isPalindrome(str: string): boolean {
  return str === str.split("").reverse().join("");
}

// just a sample of delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function wrap() {
  await delay(1000);
  console.log("1s");
  await delay(1000);
  console.log("2s");
  await delay(1000);
  console.log("Finish after 3s");
}

class Person {
  constructor(private _age: number) {}

  growFunction() {
    this._age += 1;
  }

  growArrow = () => {
    this._age += 1;
  };

  get age() {
    return this._age;
  }
}

const Ivan = new Person(26);
Ivan.growFunction();
example = Ivan.age; // 27

// functions fn(){} use calling context of Ivan instance
const growFn = Ivan.growFunction;
// thats why grow() throw a Error, because it has no context
// growFn(); // TypeError: Cannot read properties of undefined (reading '_age')

// arrow function () => {} use lexical scope
const growAr = Ivan.growArrow;
growAr();
example = Ivan.age; // 28

// Readonly
type Point = {
  readonly x: number;
  y: number;
};

const point: Point = {
  x: 1,
  y: 1,
};

// point.x = 2; // Error of typescript compiler due to readonly type
point.y = 2; // ok

// another usage of readonly
const reverseArray = (nums: readonly number[]): number[] => {
  // readonly helps us to avoid mutating the array
  // const result = nums.reverse(); Error
  const result = nums.slice().reverse();
  return result;
};

type PersonalCard = readonly [name: string, age: number];
const ivan: PersonalCard = ["Ivan", 26];
// readonly helps to avoid overwriting the tuple
// ivan[1] += 1; //Error

const protectedName: { readonly name: string } = { name: "Ivan" };
// readonly helps to avoid overwriting the key
// protectedName.name = "Demian"; Error

type Square = {
  size: number;
};

type Rectangle = {
  width: number;
  height: number;
};

type Shape = Square | Rectangle; // '|' calls Union

function area(shape: Shape): number {
  // this condition helps ts to understand difference between non-primitive types
  if ("size" in shape) {
    // here ts knows that here we works with Square type
    return shape.size ** 2;
  }
  // now ts knows that here we works with Rectangle type
  return shape.width * shape.height;
}

// difference between types and interfaces
// interfaces support only body {}, while type could be anything
type example1 = string;
type example2 = (value: example1) => void;
type example3 = example1 | example2;
interface IExample {
  one: example1;
  two: example2;
  three: example3;
}

// type uses '=' and interface not to define type/interface
type Point2D = { x: number; y: number };
interface IPoint2D {
  x: number;
  y: number;
}

// type uses '&' and interface uses 'extends' to add some fields to basic type
type Point3D = Point2D & { z: number }; // '&' calls intersection
interface IPoint3D extends IPoint2D {
  z: number;
}

// moreover we can declare interfaces twice and such declaration will add new fields to existing interface
interface ISome {
  body: object;
}
interface ISome {
  json: object;
}
const req: ISome = {
  body: {},
  json: {},
};

type Human = {
  name: string;
  surname?: string; // '?' means here 'string | undefined'
};

const stringToUpperCase = (str: string): string => str.toUpperCase();
const surnameToUpperCase = (human: Human): void => {
  // human.surname = stringToUpperCase(human.surname); // compile error because 'surname' could be undefined
  human.surname = stringToUpperCase(human.surname!); // '!' assert non-null value
};

let oldName: string;
function setOldName(text: string) {
  oldName = text;
}
setOldName("Ivan");

// @ts-ignore
example = oldName; // compile error because ts still thinks that name is undefined
example = oldName!; // to fix it we can use '!'

// OR we can define name with '!' instead
let newName!: string; // since this moment ts does not think that newName is undefined
function setNewName(text: string) {
  newName = text;
}
setNewName("Ivan");
example = newName; // all right now, compiler has no errors

class Coordinates {
  // have to set initial values in class without constructor
  x: number = 1;

  // can avoid it with '?'
  y?: number;

  //  z: number; // Compile error, because no initial value
}

class RandomCoordinates {
  x!: number;

  y!: number;

  // as we do not have 'this.x = Math.random();' in the constructor
  // ts has compile error with  'x: number'
  // thats why we use 'x!'
  constructor() {
    this.setRandomValues();
  }

  setRandomValues() {
    this.x = Math.random();
    this.y = Math.random();
  }
}

type Character = {
  profession: string;
  grade?: number; // for example 1-5
};

const plumber: Character = { profession: "plumber", grade: 2 };

// this example show us situation when we have entity or not
// for example when we expect some information in fetch's response but response is empty
const mario = Math.random() > 0.00000001 ? plumber : undefined;

function assert(check: unknown, message?: string): asserts check {
  if (!check) {
    throw new Error(message);
  }
}

// example = mario.profession; // Error because mario could be undefined

// after that we make an assertion end exclude 'undefined' type
assert(mario !== undefined, "Mario could not be undefined");
// console.log(mario.profession); // no errors =)

function assertGrade(
  value: unknown,
  message?: string
): asserts value is number {
  if (typeof value === "number") return;
  throw new Error(message);
}

//  example = mario.grade.toFixed(0); // Error because grade could be undefined
assertGrade(mario.grade); // here we or assert mario's grade as a number of throw error
example = mario.grade.toFixed(0); // here we sure that mario's grade is number

// sometime we have some variants of value that function returns
function twice(value: number | string) {
  // yep, firstly we have to ensure which type we use
  if (typeof value === "number") {
    return value * 2;
  }
  return value.repeat(2);
}

// here 'const four: string | number'
const four = twice(2);

// to avoid this we use function overload
function triple(value: number): number;
function triple(value: string): string;
function triple(value: string | number) {
  if (typeof value === "number") {
    return value * 3;
  }
  return value.repeat(3);
}

const six = triple(2); // const six: number
const tripleTwo = triple("2"); // const tripleTwo: string

// same approach we use when function has different number of arguments

function date(timestampOrYear: number): Date;
function date(timestampOrYear: number, month: number, day: number): Date;
function date(timestampOrYear: number, month?: number, day?: number) {
  if (month && day) {
    return new Date(timestampOrYear, month - 1, day);
  }
  return new Date(timestampOrYear);
}

example = date(2020, 1, 1); // 2019-12-31T21:00:00.000Z
example = date(0); // 1970-01-01T00:00:00.000Z
// example = date(2020, 1); // Error because overloads declare 1 or 3 arguments

interface IMultiply {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
}

const multiplyFn: IMultiply = (a, b, c?) =>
  a * b * (typeof c === "number" ? c : 1);

// Let's extend our understanding of classes
class PointV1 {
  constructor(public x: number, public y: number) {}
}

const PointV2 = class {
  constructor(public x: number, public y: number) {}
};

type PointCreatorV1 = new (x: number, y: number) => { x: number; y: number };

const PointV3: PointCreatorV1 = class {
  constructor(public x: number, public y: number) {}
};

// Indexes
type PersonV1 = {
  name: string;
  age: number;
};

// this type declare that all existed keys are string and has PersonV1 value
type PersonDictionaryV1 = {
  [username: string]: PersonV1;
};

// allowed to set no keys
const dictionaryV1: PersonDictionaryV1 = {};
const dictionaryV2: PersonDictionaryV1 = {
  ivan: {
    name: "ivan",
    age: 26,
  },
};

type PersonDictionaryV2 = {
  [username: string]: PersonV1;

  // this type declare that ivan key is necessary in every instances
  ivan: PersonV1;

  // using indexes does not allows to use any other type of keys and values
  // anotherKey: boolean; //Error
};

type WolfV2 = {
  kind: "wolf";
};

type Akela = {
  kind: "wolf";
  title: "leader";
};

type Mowgli = {
  age: number;
  sex: "male";
};

let simpleWolf: WolfV2 = { kind: "wolf" };
let topDog: Akela = { kind: "wolf", title: "leader" };
let manCub: Mowgli = { age: 10, sex: "male" };
simpleWolf = topDog; // ok, because 'topDog' has all keys 'simpleWolf' needs
// topDog = simpleWolf; // Error because 'WolfV2' does not have key 'title' type Akela needs
topDog = simpleWolf as Akela; // we force ts to trust us that 'simpleWolf' has all keys 'topDog' needs
// topDog = manCub; // Error obviously
// topDog = manCub as Akela; // Error because 'manCub' has redundant keys 'Akela' does not need at all
topDog = manCub as unknown as Akela; // we force ts to trust us that manCub is Akela (yep weird naming, sorry for this)

// const Assertion

const someObj = {
  name: "Ivan", // name: string
  age: 26,
};

// we can change keys
someObj.name = "Demian";
someObj.age = 0;

// to protect Objects we can assert them as const
const saveObj = {
  name: "Ivan", // readonly name: Ivan
  age: 26,
} as const;
// we can use cont assertion with one key too

// saveObj.name = "Demian"; // Error

function recordObjName(obj: { name: "Ivan" | "Demian"; age: number }) {
  example = obj.name;
}

recordObjName(saveObj); // ok, because type 'readonly name: "Ivan"' fits to 'name: "Ivan" | "Demian"'
// recordObjName(someObj); // Error because type 'name: string' does not fit to 'name: "Ivan" | "Demian"'

// this validation
// we can define this type as first argument using 'this' world
function double(this: { value: number }) {
  this.value *= 2;
}

const obj1 = {
  value: 10,
  double,
};
// works fine
obj1.double();

const obj2 = {
  valuee: 10,
  double,
};
// obj2.double(); // Error due to 'this' definition of double function

// typeof
const pointExample = {
  x: 1,
  y: 1,
};

type PointV4 = typeof pointExample;
// ts interpreter it like
// type PointV4 = {
//   x: number;
//   y: number;
// }

// Lookup types
type Damage = {
  spells: {
    fireBlast: number;
    psychoWave: number;
  };
  attack: {
    punch: number;
    kick: number;
  };
};

const merlinSpells: Damage["spells"] = {
  fireBlast: 5,
  psychoWave: 7,
};

const lancelotAttacks: Damage["attack"] = {
  punch: 2,
  kick: 3,
};

// when we want to use type as element of array we use [0] index
type Points = { x: number; y: number }[];
const pointV1: Points[0] = { x: 1, y: 1 };

// keyof
type PointV5 = {
  x: number;
  y: number;
};

const setCoordToExampleV1 = (obj: PointV5, key: keyof PointV5) => {
  example = obj[key];
};

function setCoordToExampleV2<Obj, Key extends keyof Obj>(obj: Obj, key: Key) {
  example = obj[key];
}
const setCoordToExampleV3 = <Obj, Key extends keyof Obj>(
  obj: Obj,
  key: Key
) => {
  example = obj[key];
};
