const LinkedListNode = require('./LinkedListNode')
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value) {
    const newNode = new LinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    const currentTail = this.tail;
    currentTail.next = newNode;
    this.tail = newNode;

    return this;
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    while(this.head && this.head.value === value) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;
    if(currentNode !== null) {
      while(currentNode.next) {
        if(currentNode.next.value === value) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;          
        }

        currentNode = currentNode.next;
      }
    }
  }

  deleteTail() {
    const deletedTail = this.tail;

    if(this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currentNode = this.head;
    while(currentNode.next) {
      if(!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next
      }
    }    

    this.tail = currentNode;
    return deletedTail;
  }

  deleteHead() {
    if(!this.head) {
      return null;
    }

    const deletedHead = this.head;
    if(this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  find({value = undefined, callback = undefined}) {
    if(!this.head) {
      return null;
    }

    let currentNode = this.head;
    while(currentNode) {
      if(callback && callback(currentNode.value)) {
        return currentNode;
      }

      if(value !== undefined && currentNode.value === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while(currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback) {
    return this.toArray().map(node => node.toString(callback).toString());
  }
}
