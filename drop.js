// external js: draggabilly.pkgd.js

// get all draggie elements
let draggableElems = document.querySelectorAll('.draggable');
console.dir(draggableElems[0]);
// array of Draggabillies
let draggies = []
// init Draggabillies
for ( let draggableElem of draggableElems ) {
  let draggie = new Draggabilly( draggableElem, {
    containment: true,
  });
  draggies.push( draggie );
}
const img1 = document.querySelector('.img1'),
 img2 = document.querySelector('.img2'),
img3 = document.querySelector('.img3');



// draggableElems[0].style.width = "150px";
// draggableElems[0].style.height= "150px";