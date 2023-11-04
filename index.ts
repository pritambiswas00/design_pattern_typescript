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
// for (let i of test_iterator) {
//     console.log(i, "Data")
// }
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

// for (const item of new Iterate(weirdData)) {
//     console.log(item, "Iterate Data")
// }

class Node<T>{
    private value: T;
    private left: null | Node<T>;
    private right: null | Node<T>;
    private parent: null | Node<T>
    constructor(value: T, left: Node<T> | null, right: Node<T> | null) {
        this.left = left;
        this.right = right;
        this.value = value;
        this.parent = null;
        if (this.left) {
            this.left.parent = this;
        }
        if (this.right) {
            this.right.parent = this;
        }
    }

    get left_node() {
        return this.left;
    }

    get right_node() {
        return this.right;
    }

    get get_value() {
        return this.value;
    }

    get get_parent() {
        return this.parent;
    }



}

function makeInOrderIterator<T>(root: Node<T>) {
    return {
        [Symbol.iterator]: function () {
            let current = root;
            while (current.left_node) {
                current = current.left_node;
            }
            let start = false;
            return {
                next: function () {
                    if (!start) {
                        start = true;
                        return {
                            value: current,
                            done: false
                        };
                    }
                    if (current.right_node) {
                        current = current.right_node;
                        while (current.left_node) {
                            current = current.left_node;
                        }
                        return {
                            value: current,
                            done: false
                        }
                    } else {
                        let parent = current.get_parent;
                        while (parent && current === parent.right_node) {
                            current = parent;
                            parent = parent.get_parent;
                        }
                        if (parent) current = parent;
                        return {
                            value: current,
                            done: current === null
                        };
                    }
                },
                [Symbol.iterator]: function () { return this }
            };
        }
    };
}

let root = new Node(1, new Node(2, null, null), new Node(3, null, null));

let iterateing = makeInOrderIterator(root);
console.log(iterateing[Symbol.iterator]().next().value.left_node)

