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


let canvas = document.querySelector('#canvas');
let box = document.createElement('div');
let width = 0;
box.classList.add('box');

for (let i = 0; i < (16 * 16); i ++) {
  box = document.createElement('div');
  box.classList.add('box');
  console.log(canvas.style.width);
  canvas.appendChild(box);
}