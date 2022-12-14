// /*
//  * Balanced Binary Search Tree
//  * @param {array} arr Array in question
//  * @returns balanced array
//  */

// // class Node {
// // 	constructor(data) {
// // 		this.data = data;
// // 		this.left = null;
// // 		this.right = null;
// // 	}
// // }

// // let arr = [1, 2, 3, 4, 5, 6, 7];
// // let asd = new Node(arr);

// // console.log(asd);

// const node = (data) => {
// 	return {
// 		data: data,
// 		left: null,
// 		right: null,
// 	};
// };

// const tree = (array) => {
// 	array = [...new Set(array)].sort((a, b) => a - b);

// 	// const buildTree = (array, start, end) => {
// 	// 	if (start > end) return null;

// 	// 	let mid = parseInt((start + end) / 2);
// 	// 	let root = node(array[mid]);

// 	// 	root.left = buildTree(array, start, mid - 1);
// 	// 	root.right = buildTree(array, mid + 1, end);

// 	// 	return root;
// 	// };

// 	const buildTree = (array) => {
// 		if (array.length === 0) return null;

// 		const midpoint = Math.floor(array.length / 2);
// 		const root = node(array[midpoint]);
// 		root.left = buildTree(array.slice(0, midpoint));
// 		root.right = buildTree(array.slice(midpoint + 1));
// 		return root;
// 	};

// 	const insert = (value, root) => {
// 		if (root == null) {
// 			return (root = node(value));
// 		}

// 		if (root.data < value) {
// 			root.right = insert(value, root.right);
// 		} else {
// 			root.left = insert(value, root.left);
// 		}

// 		return root;
// 	};

// 	return {
// 		root: buildTree(array, 0, array.length - 1),
// 		insert: insert,
// 		// remove: remove,
// 	};
// };

// let arr = [2, 1, 3, 4, 5, 6, 7, 7];
// let asd = tree(arr);

// console.log(asd.root);
// console.log(prettyPrint(asd.root));

// console.log(asd.insert(55));

// console.log(prettyPrint(asd.root));

class Node {
	constructor(data) {
		this.data = data;
		this.leftPart = null;
		this.rightPart = null;
	}
}

class Tree {
	constructor(array) {
		this.array = array = [...new Set(array)].sort((a, b) => a - b);
		this.root = this.buildTree(this.array, 0, this.array.length - 1);
		this.preorderData = [];
		this.inorderData = [];
		this.postorderData = [];
	}

	buildTree(array, start, end) {
		if (start > end) return null;

		let mid = parseInt((start + end) / 2);
		let root = new Node(array[mid]);

		root.leftPart = this.buildTree(array, start, mid - 1);
		root.rightPart = this.buildTree(array, mid + 1, end);

		return root;
	}

	insert(value, root = this.root) {
		if (root == null) {
			return (root = new Node(value));
		}

		if (root.data < value) {
			root.rightPart = this.insert(value, root.rightPart);
		} else {
			root.leftPart = this.insert(value, root.leftPart);
		}

		return root;
	}

	traverse(root, array) {
		if (array !== undefined) array.push(root.data);
		if (root.leftPart !== null) {
			this.traverse(root.leftPart, array);
		}

		if (root.rightPart !== null) {
			this.traverse(root.rightPart, array);
		}
		return array;
	}

	find(value, root = this.root) {
		if (root == null) return false;

		if (root.data == value) return root;

		if (root.data > value) {
			return this.find(value, root.leftPart);
		} else if (root.data < value) {
			return this.find(value, root.rightPart);
		}

		return root;
	}

	delete(value, root = this.root) {
		if (root == null) {
			return root;
		}

		if (root.data > value) {
			root.leftPart = this.delete(value, root.leftPart);
		} else if (root.data < value) {
			root.rightPart = this.delete(value, root.rightPart);
		} else {
			if (root.leftPart == null) {
				return root.rightPart;
			} else if (root.rightPart == null) {
				return root.leftPart;
			}
			root.data = minValue(root);
			root.rightPart = this.delete(root.rightPart, root.data);
		}

		return root;
	}

	levelOrder(root) {
		const queue = [];
		const result = [];

		if (root == null) return;

		queue.push(root);

		while (queue.length > 0) {
			let current = queue.shift(root);
			result.push(current.data);

			if (current.leftPart !== null) queue.push(current.leftPart);
			if (current.rightPart !== null) queue.push(current.rightPart);
		}

		return result;
	}

	preorder(root) {
		if (root == null) return;

		if (root.data !== undefined) {
			this.preorderData.push(root.data);
		}

		if (root.leftPart !== null) {
			this.preorder(root.leftPart);
		}

		if (root.rightPart !== null) {
			this.preorder(root.rightPart);
		}
	}

	inorder(root) {
		if (root == null) return;

		if (root.leftPart !== null) {
			this.inorder(root.leftPart);
		}

		if (root.data !== undefined) {
			this.inorderData.push(root.data);
		}

		if (root.rightPart !== null) {
			this.inorder(root.rightPart);
		}
	}

	postorder(root) {
		if (root == null) return;

		if (root.leftPart !== null) {
			this.postorder(root.leftPart);
		}

		if (root.rightPart !== null) {
			this.postorder(root.rightPart);
		}

		if (root.data !== undefined) this.postorderData.push(root.data);
	}

	height(root) {
		if (root == null) {
			return -1;
		} else {
			let left = this.height(root.leftPart);
			let right = this.height(root.rightPart);

			return Math.max(left, right) + 1;
		}
	}

	depth(node, root = this.root) {
		let depth = -1;

		if (node == null) return depth;

		if (
			root == node ||
			(depth = this.depth(node, root.leftPart)) >= 0 ||
			(depth = this.depth(node, root.rightPart) >= 0)
		) {
			return depth + 1;
		}

		return depth;
	}

	isBalanced(root) {
		if (root == null) return false;

		let leftHalf = root.leftPart;
		let rightHalf = root.rightPart;

		if (Math.abs(this.height(leftHalf) - this.height(rightHalf)) > 1) {
			return false;
		} else {
			return true;
		}
	}

	rebalance() {
		if (this.isBalanced(this.root)) return this.root;

		let rebalancedNewTreeArray = [];
		rebalancedNewTreeArray = this.traverse(this.root, rebalancedNewTreeArray);

		let balancedTree = new Tree(rebalancedNewTreeArray);

		return balancedTree.root;
	}
}

function minValue(root) {
	let min = root.data;
	while (root != null) {
		min = root.data;
		root = root.leftPart;
	}
	return min;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node.rightPart !== null) {
		prettyPrint(node.rightPart, `${prefix}${isLeft ? "???   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "????????? " : "????????? "}${node.data}`);
	if (node.leftPart !== null) {
		prettyPrint(node.leftPart, `${prefix}${isLeft ? "    " : "???   "}`, true);
	}
};

let arr = [2, 1, 3, 4, 5, 6, 7, 7];
let asd = new Tree(arr);

// console.log(asd.root);
// console.log(prettyPrint(asd.root));

// console.log(asd.height(asd.insert(55)));
// asd.height(asd.insert(22));
console.log(asd.delete(2));
console.log(prettyPrint(asd.root));
// console.log(prettyPrint(asd.root));
