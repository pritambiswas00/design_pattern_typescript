//This is the pattern mainly used to iterate some data structure like array, queue, stack.

class Iterate<T>{
    private data: T[]
    constructor(data: T[]) {
        this.data = data;
    }
    [Symbol.iterator]() {
        let i = 0;
        let iterate = this;
        return {
            next: function () {
                if (i < iterate.data.length) {
                    return {
                        done: false,
                        value: iterate.data[i++]
                    }
                } else {
                    return {
                        done: true,
                        value: undefined
                    }
                }
            }
        }
    }
}

const some_data = [1, "two", { name: "John" }, [4, 5, 6]];
let test_iterator = new Iterate(some_data);
for (let i of test_iterator) {
    console.log(i, "Data")
}
//Suppose we have this data 
const weirdData = [
    "🦄",
    { name: "Custom Object", age: 42 },
    "\u266A",
    () => console.log("Hello from a function!"),
    NaN,
    undefined,
    Symbol("Symbol"),
];

for (const item of new Iterate(weirdData)) {
    console.log(item, "Iterate Data")
}
