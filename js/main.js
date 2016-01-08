var canvas;
var ctx; // canvas object to which functions like fillRect are applied
var timer;
/* Defines a matrix with dimension dim and fills it with zeroes. This matrix
   is used to store the directions of arrows at each point on the grid. */
var matrix = [];
var dim = 500;
var center = Math.floor(dim / 2.0);
var n = Math.ceil(500.0 / dim);
var particle = false;

for (var i = 0; i < dim; i++) {
  matrix[i] = [];
  for (var j = 0; j < dim; j++) {
    matrix[i][j] = 0;
  }
}
/* An array of loc of sand grains, represented by their lattice points.
   Initialized as empty, but may look like [[24,24], [32,45]] after update has
   been repeatedly called. */

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  timer = setInterval(update, 1); // calls update every millisecond
  return timer;
}

function update() {
  /* Since setInterval is already set to the smallest amount of time possible,
     we use a for loop to run additional iterations of update() every
     millisecond. */
  for (var i = 0; i < 100; i++) {
    if (particle == false) {
      loc = [center,center];
      particle = true;
    }
    var x = loc[0]; // the x-coordinate of the sand grain
    var y = loc[1]; // the y-coordinate of the sand grain
    /* A series of if statements checks the direction of the arrow at the
       loc of the current grain of sand. It fills the */
    if (matrix[x][y] == 0) {
      /* These nested if statements remove any grains of sand that are about
         to exit the matrix. */
      if (y > 0) {
        loc = [x, y-1];
      }
      else {
        particle = false;
      }
      matrix[x][y] = 1; // changes arrow direction
      ctx.fillStyle = "rgb(253,14,28)"; // sets fill color
      ctx.fillRect(x*n, y*n, n, n); // visualization for arrow direction
    }
    else if (matrix[x][y] == 1) {
      if (x > 0) {
        loc = [x-1, y];
      }
      else {
        particle = false;
      }
      matrix[x][y] = 2;
      ctx.fillStyle = "rgb(12,36,252)";
      ctx.fillRect(x*n, y*n, n, n);
    }
    else if (matrix[x][y] == 2) {
      if (y < dim - 1) {
        loc = [x, y+1];
      }
      else {
        particle = false;
      }
      matrix[x][y] = 3;
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillRect(x*n, y*n, n, n);
    }
    else if (matrix[x][y] == 3) {
      if (x < dim - 1) {
        loc = [x+1, y];
      }
      else {
        particle = false;
      }
      matrix[x][y] = 0;
      ctx.fillStyle = "rgb(193,193,193)";
      ctx.fillRect(x*n, y*n, n, n);
    }
  }
}
