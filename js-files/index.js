// const check_boxes = document.querySelectorAll(".check");
// for (let i = 0; i < check_boxes.length; i++) {
//   check_boxes[i].addEventListener('click', testCheck)
// }
// function testCheck(e) {
//   if (e.target.checked == true){
//     document.querySelector('body').style.backgroundColor = 'red';
//   } else {
//     document.querySelector('body').style.backgroundColor = 'white';
//   }
// }

// Real code below

// Code for grid size
// Add event listener to grid size slider
let grid_size_slider = document.querySelector('#grid_size');
grid_size_slider.addEventListener('change', create_grid);

// Select canvas, create box template
let canvas = document.querySelector('#canvas');
let box = document.createElement('div');

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
    box.style.width = box_height + 'px';
    box.style.height = box_height + 'px';
    canvas.appendChild(box);
    }
}

// Update the grid size display below the canvas
function update_size_text (e) {
  document.querySelector('#size_text').textContent 
  = `Grid size: ${grid_size} x ${grid_size}`;
}