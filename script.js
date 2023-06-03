const map = document.getElementById("map");
const dropdowns = document.querySelectorAll(".dropdowns");
// let shortestPath = [];

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

var graph = new Graph();
window.onload(generateMap(graph));

function drawEdge(x, y, color) {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");

  ctx.strokeStyle = color;
  // console.log(x.style.left, x.style.top);
  ctx.moveTo(x.style.left.replace("px", ""), x.style.top.replace("px", "")); // Starting point of line
  ctx.lineTo(y.style.left.replace("px", ""), y.style.top.replace("px", "")); // Ending point of line
  ctx.stroke();
}

function clearCanvas() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  ctx.beginPath();
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

function generateMap(graph) {
  clearCanvas();
  map.innerHTML = " ";
  let i;
  let NoP = rhandum(10);
  while (NoP <= 5) {
    NoP = rhandum(15);
  }
  for (i = 0; i < NoP; i++) {
    const newEl = document.createElement("div");
    newEl.classList.add("location");
    newEl.setAttribute("id", `${locName(i)}`);
    // newEl.classList.add(`${locName(i)}`);
    newEl.style.top = `${rhandum(600)}px`;
    newEl.style.left = `${rhandum(600)}px`;
    newEl.innerText = `${locName(i)}`;
    createDropDown(locName(i));
    graph.addVertex(`${locName(i)}`);
    map.appendChild(newEl);
  }
  generateEdges(NoP);
}

function createDropDown(option) {
  for (let i = 0; i < 2; i++) {
    dropdowns[i].innerHTML +=
      `<option value=` + `"${option}"` + `>${option}</option>`;
  }
}

function generateEdges(NoP) {
  let NoL = rhandum(NoP * 2);
  while (NoL <= NoP) {
    NoL = rhandum(NoP * 2);
  }
  const vertices = document.querySelectorAll(".location");
  let i, x, y, weight;
  for (i = 0; i < NoL; i++) {
    x = locName(rhandum(NoP));
    y = locName(rhandum(NoP));
    weight = rhandum(20);
    graph.addEdge(`${x}`, `${y}`, weight);

    drawEdge(
      document.querySelector(`#${x}`),
      document.querySelector(`#${y}`),
      "white"
    );
  }
}

function findShortestPath() {
  const source = document.getElementById("source").value.toUpperCase();
  const destination = document
    .getElementById("destination")
    .value.toUpperCase();
  const { path, distance } = graph.shortestPath(source, destination);
  console.log(path, distance);
  let x, y;
  clearCanvas();
  for (let i = 0; i < path.length - 1; i++) {
    x = document.getElementById(`${path[i]}`);
    y = document.getElementById(`${path[i + 1]}`);
    // console.log(x, y);
    drawEdge(x, y, "green");
  }
}
