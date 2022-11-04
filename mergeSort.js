/*
 * mergeSort Array
 * @param {array} arr Array in question
 * @returns Sorted array
 */

const arr = [5, 23, 51, 15, 1, 67, 77];

const merge = (left, right) => {
	const output = [];
	let leftindex = 0;
	let rightindex = 0;

	while (leftindex < left.length && rightindex < right.length) {
		const leftEl = left[leftindex];
		const rightEl = right[rightindex];
		if (leftEl < rightEl) {
			output.push(leftEl);
			leftindex++;
		} else {
			output.push(rightEl);
			rightindex++;
		}
	}
	return [...output, ...left.slice(leftindex), ...right.slice(rightindex)];
};

const mergesort = (arr) => {
	if (arr.length <= 1) return arr;
	const mid = Math.floor(arr.length / 2);
	const left = arr.slice(0, mid);
	const right = arr.slice(mid);

	return merge(mergesort(left), mergesort(right));
};

console.log(mergesort(arr)); // returns [ 1, 5, 15, 23, 51, 67, 77 ]
