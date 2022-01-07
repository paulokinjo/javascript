const path = [];

const hasPath = (graph, src, dst) => {
  path.push(src);
  if (src === dst) {
    console.log(src + '*');
    return true;
  }

  for (let neighbor of graph[src]) {
    if (hasPath(graph, neighbor, dst) === true) {
      console.log(neighbor + '|');
      return true;
    }
  }

  path.pop();
  return false;
};

const hasPathBreadthFirst = (graph, src, dst) => {
  const queue = [src];  
  while (queue.length > 0) {
    const current = queue.shift();
    if (current === dst) {
      return true;
    }

    for (let neighbor of graph[current]) {
      queue.push(neighbor);
    }
  }

  return false;
};

const graph = {
  f: ['g', 'i'],
  g: ['h'],
  h: [],
  i: ['g', 'k'],
  j: ['i'],
  k: [],
};

console.log(hasPath(graph, 'f', 'k'), path);
console.log(hasPathBreadthFirst(graph, 'k', 'j'));
