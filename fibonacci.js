// Using iteration, write a function fibs which takes a number and returns an array
// containing that many numbers from the fibonacci sequence.
// Using an example input of 8,
// this method should return the array [0, 1, 1, 2, 3, 5, 8, 13].

function fib(n) {
	let a = 1;
	let b = 1;
	let arr = [0, 1];
	if (n === 0) return;
	if (n === 1) return [0];
	for (let i = 3; n > i; i++) {
		console.log(i);
		let c = a + b;
		arr.push(c);
		a = b;
		b = c;
	}
	return arr;
}

console.log(fib(8)); // returns  [0, 1, 1, 2, 3, 5, 8, 13]

// Now write another method fibsRec which solves the same problem recursively.
// This can be done in just a couple of lines
// (or 1 if you’re crazy, but don’t consider either of these lengths a requirement…
// just get it done).

function fibsRec(n) {
	if (n === 0) return null;
	if (n === 1) return [0];
	if (n === 2) return [0, 1];
	else {
		let arr = fibsRec(n - 1);
		arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
		return arr;
	}
}
console.log(fibsRec(8)); // returns  [0, 1, 1, 2, 3, 5, 8, 13]
