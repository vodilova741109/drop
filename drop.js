// external js: draggabilly.pkgd.js

// get all draggie elements
const 
elem =document.querySelectorAll('.obc input'),
section = document.querySelector('section'),
wrapper = document.querySelector('.wrapper'),
zone1 = document.querySelector('.zone'),
zone2 = document.querySelector('.container'),
draggableElems = document.querySelectorAll('.draggable');




for(let i = 0; i < elem.length; i++){

  elem[i].addEventListener('click', (e) =>{  
    elem[i].setAttribute('checked', 'true');  
    if(elem[i].checked &&  elem[i].value === draggableElems[i].id){
      console.log(draggableElems[i]);      
      draggableElems[i].classList.remove('d-none');
    } else {
      draggableElems[i].classList.add('d-none');
    }
  })



}

// код от библиотеки
// array of Draggabillies
// let draggies = []
// init Draggabillies
// for ( let draggableElem of draggableElems ) {
//   let draggie = new Draggabilly( draggableElem, {
//     containment: true,
//   });
//   draggies.push( draggie );
// }

// zone1.ondragover = allowDrop;
// zone2.ondragover = allowDrop;
// function allowDrop(event) {
//   event.preventDefault();
// }

// mouse
for ( let draggableElem of draggableElems ) { 
  // onmousedown возникает при захвате элемента или клике
  draggableElem.onmousedown = function(e) {
//  получаем координаты элементы left и top, высоту и ширину перемещаемого элемента
    const coords = getCoords(draggableElem),
    dragHeight = draggableElem.offsetHeight,
    dragWidth = draggableElem.offsetWidth;
 
  // console.log(dragHeight, dragWidth);
  

    const shiftX = e.pageX - coords.left;
    const shiftY = e.pageY - coords.top;
    // console.log(e.pageX, e.pageY)

     // подготовить к перемещению
     // 2. разместить на том же месте, но в абсолютных координатах  
    draggableElem.style.position = 'absolute';
     // переместим в section, чтобы мяч был точно не внутри position:relative
     section.appendChild(draggableElem);

    //  вызываем функцию
    moveAt(e);
  
    draggableElem.style.zIndex = 1000; // над другими элементами

    // передвинуть мяч под координаты курсора
    // и сдвинуть на половину ширины/высоты для центрирования  
    function moveAt(e) {
      draggableElem.style.top = e.pageY - shiftY + 'px';
      draggableElem.style.left = e.pageX - shiftX + 'px';
      
      // console.log(draggableElem.offsetTop, draggableElem.offsetLeft);
      // console.log(section.offsetTop, section.offsetLeft+section.offsetWidth);

      // &&  draggableElem.offsetLeft+draggableElem.offsetWidth >= section.offsetLeft+section.offsetWidth
    // органичения по section
    // по высоте
      if (draggableElem.offsetTop <= section.offsetTop ) {
        draggableElem.style.top = section.offsetTop  + 'px';
        // draggableElem.style.left = section.offsetLeft+section.offsetWidth - draggableElem.offsetWidth + 'px';
        const coords1 = getCoords(draggableElem);
        console.log(coords1)   
      }
       else if(draggableElem.offsetTop + draggableElem.offsetHeight  >= section.offsetTop + section.offsetHeight ) {
        draggableElem.style.top = section.offsetTop + section.offsetHeight - draggableElem.offsetHeight + 'px';
      }
       // по ширине

      if (draggableElem.offsetLeft <= section.offsetLeft ) {
        draggableElem.style.left  = section.offsetLeft  + 'px';
        // draggableElem.style.left = section.offsetLeft+section.offsetWidth - draggableElem.offsetWidth + 'px';
        const coords1 = getCoords(draggableElem);
        console.log(coords1)   
      } 
      else if(draggableElem.offsetLeft + draggableElem.offsetWidth  >= zone2.offsetLeft + zone2.offsetWidth ) {
        draggableElem.style.left = zone2.offsetLeft + zone2.offsetWidth - draggableElem.offsetWidth + 'px';
      }
     
    }
  
    document.onmousemove = function(e) {
      moveAt(e);
    };
  
    draggableElem.onmouseup = function() {
      document.onmousemove = null;
      draggableElem.onmouseup = null;
    };
   
  }


  
}


// Отмена действия браузера по событию dragstart.
for ( let draggableElem of draggableElems ) {
  draggableElem.ondragstart = function() {
  return false;
};
}


function getCoords(elem) {   // кроме IE8-
  // возвращает размер элемента и его позицию относительно viewport
  const box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}



// код для изменения параметров поля и элементов
const img1 = document.querySelector('.img1'),
 img2 = document.querySelector('.img2'),
  img3 = document.querySelector('.img3');
// draggableElems[0].style.width = "150px";
// draggableElems[0].style.height= "150px";


// function drag(event){
//   event.dataTransfer.setData('id', event.target.id);
// }
// zone1.touchmove = drop;
// zone2.touchmove = drop;

// function drop(event) {  
//   let itemId = event.dataTransfer.getData('id'); 
//   event.target.append(document.getElementById(itemId));  
// }