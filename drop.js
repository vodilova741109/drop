// вводные данные
const 
formUchastok = document.querySelectorAll('.form-uchastok input');
elem =document.querySelectorAll('.obc input'),
elemType =document.querySelectorAll('input[name="elem-type[]"]'),
inputParam = document.querySelectorAll('fieldset .fusion-form-checkbox'),
section = document.querySelector('section'),
wrapper = document.querySelector('.wrapper'),
zone1 = document.querySelector('.zone'),
container = document.querySelector('.container'),
blockPading = document.querySelector('.block-ots'),
draggableElems = document.querySelectorAll('.draggable'),
btnControle = document.querySelector('.calc-control');
// добавить картинку и див под инпуты
function addImagEndInput(){
  for(let i = 0; i < elem.length; i++){
    const inputElement = document.createElement('div');  
    elem[i].addEventListener('change', (e) =>{  
      e.preventDefault;
      elem[i].setAttribute('checked', 'true'); 
            
      if(elem[i].checked &&  elem[i].value === draggableElems[i].id){
        // добавляет img и див под инпуты 
        draggableElems[i].classList.remove('d-none');
        // console.log(draggableElems[i])
        addInput(i, inputElement);
        
      } else {
        // удаляет img и див под инпуты 
        draggableElems[i].classList.add('d-none');    
        inputParam[i].removeChild(inputElement);
      }
    })
  }
}
addImagEndInput();
// функция добавляет в див инпуты 
function addInput(i,inputElement) {   
  inputElement.classList.add('param'); 
  if(draggableElems[i].id == 'minDer' || draggableElems[i].id == 'maxDer') {          
    inputElement.innerHTML = '<input class="height" type="number" min="1" max="7" placeholder="5" value="5"> Высота(м) ';              
    inputParam[i].appendChild(inputElement);        
  } 
  else if (draggableElems[i].id == 'cust' || draggableElems[i].id == 'zvety') {   
    inputElement.innerHTML = '<input class="height" type="number" min="1" max="5" placeholder="2" value="3"> Ширина(м) ';              
    inputParam[i].appendChild(inputElement);        
  }
  else {
    inputElement.innerHTML = '<input class="height" type="number" min="1" max="100" placeholder="5" value="60"> Площадь(м2) ';     
    inputParam[i].appendChild(inputElement); 
  }
     
         
}
 // функция получения и передачи параметров
function getParam(){
  container.style.height = formUchastok[1].value*150 +'px';
  container.style.width = formUchastok[0].value*150 +'px';
  inputParam.forEach( (item, index) => {
    const blockParam = item.querySelectorAll(' input');
    let arrayValue = [];
    if(blockParam[0].checked){
      for (let i = 0; i < blockParam.length; i++) {        
        arrayValue.push(blockParam[i].value);   

        // console.log(draggableElems[i].id);
    
        for (let i = 0; i < draggableElems.length; i++) { 
         
          if(draggableElems[i].id == blockParam[0].value) {   
            if(draggableElems[i].id == 'minDer' || draggableElems[i].id == 'maxDer'  || draggableElems[i].id == 'cust' || draggableElems[i].id == 'zvety') {            
              draggableElems[i].style.height = blockParam[1].value*15 +'px';
              draggableElems[i].style.width =blockParam[1].value*15 +'px';       
            } else {       
         
            draggableElems[i].style.height = Math.sqrt(blockParam[1].value)*15 +'px';
            draggableElems[i].style.width = Math.sqrt(blockParam[1].value)*15 +'px'; 

            }    
          } 
         }
      } 
    }
  })
}
 //событиe передачи параметров
btnControle.addEventListener('click', (e) =>{ 
  e.preventDefault(); 
  getParam();
})  

// DROP
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
// container.ondragover = allowDrop;
// function allowDrop(event) {
//   event.preventDefault();
// }

for ( let draggableElem of draggableElems ) {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // код для мобильных устройств
    // console.log('мобильник');
    draggableElem.addEventListener('touchmove', dragMove);
    function dragMove(event) {    
     event.preventDefault();
     // индекс кол-во пальцев
     let touch = event.targetTouches[0];  
     draggableElem.style.position = 'absolute';
     // передаем координаты и вычисляем относительно обертки и центра самого себя      
     draggableElem.style.top = `${touch.pageY - wrapper.offsetTop - (draggableElem.offsetHeight/2)}px`;
     draggableElem.style.left = `${touch.pageX - wrapper.offsetLeft - (draggableElem.offsetWidth/2)}px`; 
     // 15 px border container   
     drag(container.offsetTop, 15, 0);
   }
  } else {
    // код для обычных устройств
    // console.log('обычное');
    draggableElem.onmousedown = function(e) {
      //  получаем координаты элементы left и top, высоту и ширину перемещаемого элемента
          const coords = getCoords(draggableElem),
          dragHeight = draggableElem.offsetHeight,
          dragWidth = draggableElem.offsetWidth;     
      
          const shiftX = e.pageX - coords.left;
          const shiftY = e.pageY - coords.top;         
      
            // подготовить к перемещению
            // 2. разместить на том же месте, но в абсолютных координатах  
          draggableElem.style.position = 'absolute';
            // переместим в section, чтобы мяч был точно не внутри position:relative
            section.appendChild(draggableElem);      
          //  вызываем функцию
          moveAt(e);        
          draggableElem.style.zIndex = 1000; // над другими элементами
      
          // передвинуть элемент под координаты курсора
          // и сдвинуть на половину ширины/высоты для центрирования  
          function moveAt(e) {
            draggableElem.style.top = e.pageY - shiftY + 'px';
            draggableElem.style.left = e.pageX - shiftX + 'px';
            // ограничения
            // 15 px border container + 20px padding section 
            drag(wrapper.offsetTop, 15, 20);
            
          }
          document.onmousemove = function(e) {
            moveAt(e);
          };
          // сброс элемента 
          draggableElem.onmouseup = function() {
            document.onmousemove = null;
            draggableElem.onmouseup = null;
          };
        }  
  }
  // Отмена действия браузера по событию dragstart.
  draggableElem.ondragstart = function() {
    return false;
    };
  // touchmove

//  draggableElem.addEventListener('mousedown', dragMoveMouse);
 
  function drag(Top, ots, ots2){
    // по высоте
    
    if (draggableElem.offsetTop <= Top) {
      draggableElem.style.top =  `${Top+ots}px`;
    }
    else if(draggableElem.offsetTop + draggableElem.offsetHeight  >= Top + container.offsetHeight ) {
      draggableElem.style.top = `${Top + container.offsetHeight -draggableElem.offsetHeight-ots}px`;
    
    }
    // по ширине
    if (draggableElem.offsetLeft <= container.offsetLeft) {
      draggableElem.style.left  = `${container.offsetLeft+ ots +ots2}px`;     
      console.log(container.offsetLeft)

    }     
    else if(draggableElem.offsetLeft + draggableElem.offsetWidth  >= container.offsetLeft + container.offsetWidth ) {
      draggableElem.style.left = `${container.offsetLeft + container.offsetWidth +ots/2 -draggableElem.offsetWidth}px`;
    }      
    // условия отступа
      let otstup = 15;
      switch(draggableElem.id) {
        case 'home': 
        case 'maxDer':
        case 'banya':
        case 'vodoem':
        otstup = 45;
        break;
        case 'minDer':
        case 'hozp':
          otstup = 30;
        break;
        default:
          otstup = 15;
          break;
      }
  
      if(draggableElem.offsetTop < (Top + ots + otstup -2) || 
      draggableElem.offsetLeft < container.offsetLeft+ ots + ots2 + otstup  ||
      draggableElem.offsetTop + draggableElem.offsetHeight  > Top + container.offsetHeight -ots - otstup||
      draggableElem.offsetLeft + draggableElem.offsetWidth  > container.offsetLeft + ots2 + container.offsetWidth -ots - otstup +2
      ) {     
        draggableElem.classList.add('neon');
        console.log(wrapper.offsetTop + container.offsetHeight -draggableElem.offsetHeight-ots -otstup);
        console.log(wrapper.offsetTop,container.offsetHeight,draggableElem.offsetHeight,ots,otstup);
        
        }
      else {
        draggableElem.classList.remove('neon');
        } 
  }

}


// mouse
// for ( let draggableElem of draggableElems ) { 
//   // onmousedown возникает при захвате элемента или клике
//   draggableElem.onmousedown = function(e) {
// //  получаем координаты элементы left и top, высоту и ширину перемещаемого элемента
//     const coords = getCoords(draggableElem),
//     dragHeight = draggableElem.offsetHeight,
//     dragWidth = draggableElem.offsetWidth;
 
//   // console.log(dragHeight, dragWidth);
  

//     const shiftX = e.pageX - coords.left;
//     const shiftY = e.pageY - coords.top;
//     // console.log(e.pageX, e.pageY)

//      // подготовить к перемещению
//      // 2. разместить на том же месте, но в абсолютных координатах  
//     draggableElem.style.position = 'absolute';
//      // переместим в section, чтобы мяч был точно не внутри position:relative
//      section.appendChild(draggableElem);

//     //  вызываем функцию
//     moveAt(e);
  
//     draggableElem.style.zIndex = 1000; // над другими элементами

//     // передвинуть мяч под координаты курсора
//     // и сдвинуть на половину ширины/высоты для центрирования  
//     function moveAt(e) {
//       draggableElem.style.top = e.pageY - shiftY + 'px';
//       draggableElem.style.left = e.pageX - shiftX + 'px';
//     //  ограничения
//     // по высоте
//       if (draggableElem.offsetTop <= container.offsetTop ) {
//         draggableElem.style.top = container.offsetTop  + 'px';
//         // draggableElem.style.left = section.offsetLeft+section.offsetWidth - draggableElem.offsetWidth + 'px';
//         const coords1 = getCoords(draggableElem);
//         // console.log(coords1);
       
//         // console.log(coords1)   
//       }
//        else if(draggableElem.offsetTop + draggableElem.offsetHeight  >= container.offsetTop + container.offsetHeight ) {
//         draggableElem.style.top = (container.offsetTop + container.offsetHeight - draggableElem.offsetHeight) + 'px';
       
//       }
//        // по ширине

//       if (draggableElem.offsetLeft <= container.offsetLeft) {
//         draggableElem.style.left  = container.offsetLeft + 35 + 'px' ;
//         // draggableElem.style.left = section.offsetLeft+section.offsetWidth - draggableElem.offsetWidth + 'px';
//         // const coords1 = getCoords(draggableElem);
     
         
//       } 
//       else if(draggableElem.offsetLeft + draggableElem.offsetWidth  >= container.offsetLeft + container.offsetWidth ) {
//         draggableElem.style.left = container.offsetLeft + container.offsetWidth - draggableElem.offsetWidth + 35 +  'px';
//       }
       
//       // условия отступа
       

//         let otstup = 15;
//         switch(draggableElem.id) {
//           case 'home': 
//           case 'maxDer':
//           case 'banya':
//           case 'vodoem':
//           otstup = 45;
//           break;
//           case 'minDer':
//           case 'hozp':
//             otstup = 30;
//           break;
//           default:
//             otstup = 15;
//             break;
//         }

//         if(draggableElem.offsetTop <= (container.offsetTop + otstup) || 
//         draggableElem.offsetLeft <= container.offsetLeft + otstup + 20 ||
//         draggableElem.offsetTop + draggableElem.offsetHeight  >= container.offsetTop + container.offsetHeight - otstup ||
//         draggableElem.offsetLeft + draggableElem.offsetWidth  >= container.offsetLeft + container.offsetWidth - otstup 
//         )        {
         
//           draggableElem.classList.add('neon');
//         }
//         else {
//           draggableElem.classList.remove('neon');
//         }
//     }
//     document.onmousemove = function(e) {
//       moveAt(e);
//     };
//     draggableElem.onmouseup = function() {
//       document.onmousemove = null;
//       draggableElem.onmouseup = null;
//     };
//   }  
// }
// Отмена действия браузера по событию dragstart.
// for ( let draggableElem of draggableElems ) {
//   draggableElem.ondragstart = function() {
//   return false;
//   };
// }
function getCoords(elem) {   // кроме IE8-
  // возвращает размер элемента и его позицию относительно viewport
  const box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}







