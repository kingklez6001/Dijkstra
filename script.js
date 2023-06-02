const map = document.getElementById("map");

class Graph {
  constructor() {
    this.vertices = [];
    this.edges = {};
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
    this.edges[vertex] = {};
  }

  addEdge(vertex1, vertex2, weight) {
    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight;
  }

  dijkstra(startVertex) {
    const distances = {};
    const visited = {};
    const previous = {};
    const queue = [];

    for (const vertex of this.vertices) {
      distances[vertex] = Infinity;
      visited[vertex] = false;
      previous[vertex] = null;
    }

    distances[startVertex] = 0;
    queue.push({ vertex: startVertex, distance: 0 });

    while (queue.length > 0) {
      queue.sort((a, b) => a.distance - b.distance);
      const { vertex: currentVertex } = queue.shift();

      if (visited[currentVertex]) {
        continue;
      }

      visited[currentVertex] = true;

      for (const neighbor in this.edges[currentVertex]) {
        const distance =
          distances[currentVertex] + this.edges[currentVertex][neighbor];

        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          previous[neighbor] = currentVertex;
          queue.push({ vertex: neighbor, distance });
        }
      }
    }

    return { distances, previous };
  }

  shortestPath(startVertex, endVertex) {
    const { distances, previous } = this.dijkstra(startVertex);

    if (distances[endVertex] === Infinity) {
      return null; // No path found
    }

    const path = [];
    let currentVertex = endVertex;

    while (currentVertex !== null) {
      path.unshift(currentVertex);
      currentVertex = previous[currentVertex];
    }

    return { path, distance: distances[endVertex] };
  }
}

function drawEdge(x, y) {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = "white";
  console.log(x.style.left.replace("px", ""), x.style.top);
  ctx.moveTo(x.style.left.replace("px", ""), x.style.top.replace("px", "")); // Starting point of line
  ctx.lineTo(y.style.left.replace("px", ""), y.style.top.replace("px", "")); // Ending point of line
  ctx.stroke();
}

function locName(x) {
  const Names = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  return Names[x];
}

let edges = [];

function rhandum(x) {
  return Math.floor(Math.random() * x);
}

function generateMap() {
  clearCanvas();
  map.innerHTML = " ";
  const graph = new Graph();
  let i;
  let NoP = rhandum(10);
  while (NoP <= 5) {
    NoP = rhandum(15);
  }
  for (i = 0; i < NoP; i++) {
    const newEl = document.createElement("div");
    newEl.classList.add("location");
    newEl.classList.add(`${locName(i)}`);
    newEl.style.top = `${rhandum(600)}px`;
    newEl.style.left = `${rhandum(600)}px`;
    newEl.innerText = `${locName(i)}`;
    graph.addVertex(`${locName(i)}`);
    map.appendChild(newEl);
  }
  generateEdges(NoP);
}

function generateEdges(NoP) {
  let NoL = rhandum(NoP * 2);
  while (NoL <= NoP) {
    NoL = rhandum(NoP * 2);
  }
  const vertices = document.querySelectorAll(".location");
  let i;
  for (i = 0; i < NoL; i++) {
    drawEdge(
      document.querySelector(`.${locName(rhandum(NoP))}`),
      document.querySelector(`.${locName(rhandum(NoP))}`)
    );
  }
}

// Example usage:

// graph.addEdge("A", "B", 4);
// graph.addEdge("A", "C", 2);
// graph.addEdge("B", "E", 3);
// graph.addEdge("C", "D", 2);
// graph.addEdge("D", "E", 3);

// const { path, distance } = graph.shortestPath("A", "E");

// console.log("Shortest path:", path); // Output: ["A", "C", "D", "E"]
// console.log("Distance:", distance); // Output: 7

function findShortestPath() {}
