const check_boxes = document.querySelectorAll(".check");
for (let i = 0; i < check_boxes.length; i++) {
  check_boxes[i].addEventListener('click', testCheck)
}
function testCheck(e) {
  if (e.target.checked == true){
    document.querySelector('body').style.backgroundColor = 'red';
  } else {
    document.querySelector('body').style.backgroundColor = 'white';
  }
}
