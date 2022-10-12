// Select canvas, create box template
let canvas = document.querySelector('#canvas');
let box = document.createElement('div');

// Initial grid toggle
let grid_toggle_button = document.querySelector('#grid_toggle');
grid_toggle_button.addEventListener('click', toggle_grid);

// Code for changing grid size
// Add event listener to grid size slider
let grid_size_slider = document.querySelector('#grid_size');
grid_size_slider.addEventListener('change', create_grid);
grid_size_slider.addEventListener('input', update_size_text);

// Create initial grid
let grid_size = 16;
let box_width = 500/16;
let box_height = 500/16;
create_grid();


// Creates grid based on value of grid size
function create_grid (e) {
  get_grid_size();
  remove_grid();
  draw_grid();
  update_size_text();
}

// Get grid size
function get_grid_size () {
  grid_size = grid_size_slider.value;
  box_width = 500/grid_size;
  box_height = 500/grid_size;
}

// Remove current grid from canvas
function remove_grid () {
  canvas.textContent = '';
}

// Draw grid on canvas
function draw_grid () {
  for (let i = 0; i < (grid_size * grid_size); i ++) {
    box = document.createElement('div');
    box.classList.add('box');
    // Check if grid toggle is on
    if (grid_toggle_button.checked == false) {
      box.style.border = '0px';
    }
    // Gives each box the ability to be drawn on
    box.addEventListener('mouseenter', fill);
    box.style.width = box_height + 'px';
    box.style.height = box_height + 'px';
    canvas.appendChild(box);
    }
}

// Update the grid size display below the canvas
function update_size_text (e) {
  grid_size = grid_size_slider.value;
  document.querySelector('#size_text').textContent 
  = `Grid size: ${grid_size} x ${grid_size}`;
}

// Toggle eraser
let eraser_toggle = document.querySelector('#eraser_toggle');

eraser_toggle.addEventListener('click', erase);
function erase (e) {
  if (e.target.checked == true) {
    console.log('activated');
  }
  else {
    console.log('inactive');
  }
}


// Pen functionality
let mouse_is_down = false;
function fill (e) {
  e.target.addEventListener('mousedown', () => {mouse_is_down = true});
  e.target.addEventListener('mouseup', () => {mouse_is_down = false});
  if (mouse_is_down == true) {
    if (eraser_toggle.checked == false) {
      e.target.style.backgroundColor = color.value;
    }
    else {
      e.target.style.backgroundColor = background_colour.value;
    }
  }
}

// Change pen color
let color = document.querySelector('#pen_color');

// Change background color
let background_colour = document.querySelector('#background_color');
background_colour.addEventListener('change', repaint_canvas);

function repaint_canvas (e) {
  console.log(e.target.value);
  canvas.style.backgroundColor = e.target.value;
}

// Toggle grid lines

function toggle_grid (e) {
  let boxes = document.querySelectorAll('.box');
  if (e.target.checked == false) {
    for (let i = 0; i < (grid_size * grid_size); i++) {
      boxes[i].style.border = '0px';
      }
  }
  else {
    for (let i = 0; i < (grid_size * grid_size); i++) {
      boxes[i].style.border = '0.05px solid black';
      }
  }
}


// Shade mode

// Lighten mode

// Rainbow mode

// Pen size
