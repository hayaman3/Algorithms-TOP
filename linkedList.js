class Node {
	constructor(value) {
		this.value = value;
		this.nextNode = null;
	}
}

class LinkedList {
	constructor(headNode) {
		this.HEAD = headNode;
		this.HEAD.nextNode = null;
	}

	append(value) {
		const newNode = new Node(value);
		let temp = this.HEAD;

		while (temp.nextNode != null) {
			temp = temp.nextNode;
		}

		temp.nextNode = newNode;
	}

	prepend(value) {
		let newHead = new Node(value);

		newHead.nextNode = this.HEAD;
		this.HEAD = newHead;
	}

	size() {
		let count = 0;
		let temp = this.HEAD;

		while (temp != null) {
			temp = temp.nextNode;
			count++;
		}

		return count;
	}

	head() {
		return this.HEAD.value;
	}

	tail() {
		let temp = this.HEAD;

		while (temp.nextNode != null) {
			temp = temp.nextNode;
		}

		return temp.value;
	}

	at(index) {
		let temp = this.HEAD;
		let count = 1;

		while (temp.nextNode != null && count !== index) {
			temp = temp.nextNode;
			count++;
		}

		return temp.value;
	}

	pop() {
		let temp = this.HEAD;

		while (temp.nextNode.nextNode != null) {
			temp = temp.nextNode;
		}

		temp.nextNode = null;
	}

	contains(value) {
		let temp = this.HEAD;

		while (temp != null && temp.value !== value) {
			temp = temp.nextNode;
		}

		return temp == null ? false : true;
	}

	find(value) {
		let temp = this.HEAD;
		let index = 0;

		while (temp != null) {
			if (temp.value == value) return index;
			index++;
			temp = temp.nextNode;
		}

		return null;
	}

	toString() {
		let temp = this.HEAD;
		let string = "";

		while (temp != null) {
			console.log(temp.value);
			string += `(${temp.value}) -> `;
			temp = temp.nextNode;
		}

		string += "(null)";

		return string;
	}

	insertAt(value, index) {
		let temp = this.HEAD;
		let tempNext;
		let count = 1;
		let newNode = new Node(value);

		if (index == 0) {
			newNode.nextNode = temp;
			this.HEAD = newNode;
			return;
		}

		while (temp != null) {
			if (count == index) {
				tempNext = temp.nextNode;
				temp.nextNode = newNode;
				newNode.nextNode = tempNext;
				return;
			}

			count++;
			temp = temp.nextNode;
		}
	}

	removeAt(index) {
		if (index === 0) {
			const valueOfRemoved = this.HEAD.value;
			this.HEAD = this.HEAD.nextNode;
			return valueOfRemoved;
		}

		const nodeBeforeRemovedOne = this.at(index - 1);
		const valueOfRemoved = nodeBeforeRemovedOne.nextNode.value;
		nodeBeforeRemovedOne.nextNode = nodeBeforeRemovedOne.nextNode.nextNode;

		return valueOfRemoved;
	}
}

let node1 = new Node(2);
let node2 = new Node(5);
node1.next = node2;

let list = new LinkedList(node1);
console.log(list.HEAD.next.value); //returns 5
