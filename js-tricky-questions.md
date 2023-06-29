##### 1. What is a potential pitfall with using typeof bar === "object" to determine if bar is an object? How can this pitfall be avoided?

`null` is also an object so need to check for `null` first

##### 2. What will the code below output to the console and why?
```
(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));
```
`var a = b = 3;` is shorthand for `b=3; var a = b;`
b is not preceded by `var` so it becomes a global variable while a is only available in scope.
```
Output:
a defined? false
b defined? true
```

##### 3. What will the code below output to the console and why?
```
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();
```
In the outer function this refers to myObject and self refers to this so they both refer to myObject and has access to foo. In the inner function, this refers to the inner function and doesn't have access to foo but self is within scope and refers to myObject so has access to foo.
```
Output:
outer func:  this.foo = bar
outer func:  self.foo = bar
inner func:  this.foo = undefined
inner func:  self.foo = bar
```

##### 4. What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?
It creates a closure around the function which creates a private scope for variables that are only accessible by the function, which helps avoid name conflicts.

##### 5. What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?
Strict mode causes javascript to enforce stricter rules to prevent subtle bugs by throwing errors that will usually fail silently.

##### 6.Consider the two functions below. Will they both return the same thing? Why or why not?
```
function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}
```
No, foo2() will have a semicolon automatically inserted after return causing it to return `undefined` while foo1() will return an object with a property bar.

##### 7. What will the code below output? Explain your answer.
```
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);
```
```
Output:
0.30000000000000004
false
```
floats are stored with floating point precision so they may not be exact values.

##### 8. In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?
```
(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();
```
```
Output:
1
4
3
2
```
1 and 4 go first because they aren't in a setTimeout. 3 is next because even if though it has a 0 timeout it is but on the event queue so triggers after 4.

##### 9. Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.
```
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase();
  return (str == str.split('').reverse().join(''));
}
```

##### 10. Write a sum method which will work properly when invoked using either syntax below.
```
console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5
```
```
function sum(x, y) {
  if (y !== undefined) {
    return x + y;
  } else {
    return function(y) { return x + y; };
  }
}
```

##### 11. Consider the following code snippet:
```
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```
(a) What gets logged to the console when the user clicks on “Button 4” and why?
5 for all buttons var has function scope so by the time the function is called it uses the current value of i which is 5.

(b) Provide one or more alternate implementations that will work as expected.
Use let instead of var for i so it is block scoped and only has the value at the time it was given to the log function.

##### 12. Assuming d is an “empty” object in scope, say:
```
var d = {};
```
…what is accomplished using the following code?
```
[ 'zebra', 'horse' ].forEach(function(k) {
	d[k] = undefined;
});
```
It explicitly sets zebra and horse property to undefined which shows up when getting Object.keys(d);

##### 13. What will the code below output to the console and why?
```
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
```
```
Output:
array 1: length=5 last=j,o,n,e,s
array 2: length=5 last=j,o,n,e,s
```
`reverse()` reverses the array itself and returns a reference to the array. So arr2 has the same pointer as arr1. When you push arr3 onto arr2 it also modifies arr1 since it has the same pointer. Pushing an array onto another array adds the array itself as an element. When you concat an array to a string it prints as comma separated values.

##### 14. What will the code below output to the console and why?
```
console.log(1 +  "2" + "2");
console.log(1 +  +"2" + "2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log( "A" - "B" + "2");
console.log( "A" - "B" + 2);
```
```
Output:
122
32
02
112
NaN2
NaN
```
1. 1 + "2" is doing a string concatenation
2. \+ or - before a string tries to convert it into a number. so +"2" becomes 2 which is added to 1 to get 3 then concatenated with "2".
3. Same reason as #2. 1 -1 is 0 concatenated with 2.
4. +"1" just because 1 and we get the same answer as #1.
5. There is no - for strings so you get a NaN when trying to subtract them then we concatenate 2 to that.
6. NaN + 2 is NaN

##### 15. The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?
```
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};
```
Because setTimeout is used the call is placed on the event queue then completed which prevents a stack overflow.

##### 16. What is a “closure” in JavaScript? Provide an example.
A closure is an inner function that has access to the enclosing function's scope.
```
function f() {
  var v = "variable";
  function innerF() {
    console.log(v);
  }
}
```

##### 17. What would the following lines of code output to the console?
```
console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));
```
```
0 || 1 = 1 // || takes the first true
1 || 2 = 1 // same reason as #1
0 && 1 = 0 // && takes the first false
1 && 2 = 2 // && takes the last true if no false
```

##### 18. What will be the output when the following code is executed? Explain.
```
console.log(false == '0')
console.log(false === '0')
```
```
Output:
true
false
```
== coerces the values before comparing. '0' evaluates to false.
\=== compares value and type

##### 19. What is the output out of the following code? Explain your answer.
```
var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);
```
```
Output:
456
```
The property key gets stringified to `[object Object]` so a[c] becomes b and c converts "[object Object]" which causes 456 to overwrite the property.

##### 20. What will the following code output to the console:
```
console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));
```
10! which is 3628800

##### 21. Consider the code snippet below. What will the console output be and why?
```
(function(x) {
    return (function(y) {
        console.log(x);
    })(2)
})(1);
```
1 because of closures. The inner function has access to the outer function's x.

##### 22. What will the following code output to the console and why:
```
var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());
```
##### What is the issue with this code and how can it be fixed.
```
Output:
undefined
John Doe
```
When stoleSecretIdentity() is called it is called by the window object which doesn't have _name property so it's undefined.
To fix this use `var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);` to bind hero as this when it's called.

##### 23. Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

The arguments to the function should be:

- DOM element
- callback function (that takes a DOM element as its argument)
```
function traverse(ele, callback) {
  callback(ele);
  for (let child of ele.children) {
    traverse(child, callback);
  }
}
```

##### 24. Testing your this knowledge in JavaScript: What is the output of the following code?
```
var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);
```
```
Output:
10
2
```
The `fn` in `obj.method(fn, 1);` is declared at the window scope so that prints out 10. `arguments[0]` refers to `fn` but when that `fn` is called the scope is `arguments` and `arguments.length` is 2 because 2 arguments were passed at `obj.method(fn, 1);`

##### 25. Consider the following code. What will the output be, and why?
```
(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();
```
```
Output:
1
undefined
2
```
`x` and `y` are hoisted to function level but there is a local `x` in the catch that has precedence and that `x` is separate from the hoisted `x`. So outside of the try/catch x is still `undefined`. `y` however does get modified in the catch block and prints out `2`.
##### 26. What will be the output of this code?
```
var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();
```
```
Output:
undefined
```
The local `var x = 20;` is hoisted within the function like so:
```
var girl = function() {
  var x;
  console.log(x);
  x = 20;
}
```
Which prints undefined.

##### 27. 
```
for (let i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i); }, i * 1000 );
}
```
##### What will this code print?
```
0 1 2 3 4
```
`let` is used so it's only available in the scope.

##### 28. What do the following lines output, and why?
```
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```
```
Output:
true
false
```
`1 < 2 < 3` becomes `true < 3`. `true` evaluates to 1 so `1 < 3` is `true`
`3 > 2 > 1` = `true > 1` = `1 > 1` = `false`

##### 29. How do you add an element at the begining of an array? How do you add one at the end?
```
arr.unshift(ele); // add to beginning
arr.push(ele); // add to end
```
##### 30. Imagine you have this code:

```var a = [1, 2, 3];```

```a[10] = 99;```

```console.log(a[6]);```
a) Will this result in a crash?
It won't crash because javascript will put empty slots in between.
b) What will this output?
undefined, the slot is treated as empty but will return undefined
##### 31. What is the value of `typeof undefined == typeof NULL`?
`true`, `NULL` is type `undefined`

##### 32. What would following code return?
```console.log(typeof typeof 1);```
`typeof typeof 1` = `typeof 'number'` = `string`
##### 33. What will be the output of the following code:
```
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
```
```
Output:
5 5 5 5 5
```
`var i` is hoisted to function scope. When the function runs `i` will be 5.
##### 34. What is `NaN`? What is its type? How can you reliably test if a value is equal to `NaN`?
`NaN` is not a number which results when doing arithmetic with non-numeric number or arithmetic resulting in non-numeric answer.
`typeof NaN` is `number`.
Test for `NaN` with `Number.isNaN()`

##### 35. What will the following code output and why?
```
var b = 1;
function outer(){
   	var b = 2
    function inner(){
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer();
```
```
Output:
3
```
`inner()` becomes this when after hoisting:
```
function inner(){
        var b;
        b++; // NaN
        b = 3;
        console.log(b)
    }
```
##### 36. Discuss possible ways to write a function isInteger(x) that determines if x is an integer.
```
function isInteger(x) { return (x ^ 0) === x; } 
function isInteger(x) { return (typeof x === 'number') && (x % 1 === 0); }
function isInteger(x) { return Math.round(x) === x; }
```
##### 37. How do you clone an object?
```
var obj = {a: 1 ,b: 2}
var objclone = Object.assign({},obj);
```
```Object.assign()``` only does a shallow copy though.