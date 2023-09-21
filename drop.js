// вводные данные
const 
formUchastok = document.querySelectorAll('.form-uchastok input');
elem =document.querySelectorAll('.obc input'),
elemType =document.querySelectorAll('input[name="elem-type[]"]'),
inputParam = document.querySelectorAll('fieldset .fusion-form-checkbox'),
section = document.querySelector('section'),
wrapper = document.querySelector('.wrapper'),
zone1 = document.querySelector('.zone'),
zone2 = document.querySelector('.container'),
draggableElems = document.querySelectorAll('.draggable'),
btnControle = document.querySelector('.calc-control');

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




 //  функция получения и передачи параметров
function getParam(){
  zone2.style.height = formUchastok[1].value*150 +'px';
  zone2.style.width = formUchastok[0].value*150 +'px';
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
        console.log(coords1);
       
        // console.log(coords1)   
      }
       else if(draggableElem.offsetTop + draggableElem.offsetHeight  >= section.offsetTop + zone2.offsetHeight ) {
        draggableElem.style.top = (section.offsetTop + zone2.offsetHeight - draggableElem.offsetHeight) + 'px';
       
      }
       // по ширине

      if (draggableElem.offsetLeft <= zone2.offsetLeft) {
        draggableElem.style.left  = zone2.offsetLeft + 30 + 'px' ;
        // draggableElem.style.left = section.offsetLeft+section.offsetWidth - draggableElem.offsetWidth + 'px';
        // const coords1 = getCoords(draggableElem);
     
         
      } 
      else if(draggableElem.offsetLeft + draggableElem.offsetWidth  >= zone2.offsetLeft + zone2.offsetWidth ) {
        draggableElem.style.left = zone2.offsetLeft + zone2.offsetWidth - draggableElem.offsetWidth + 'px';
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
            otstup = 30;
          break;
          default:
            otstup = 15;
            break;
        }

        if(draggableElem.offsetTop <= (section.offsetTop + otstup) || 
        draggableElem.offsetLeft <= zone2.offsetLeft + otstup +10 ||
        draggableElem.offsetTop + draggableElem.offsetHeight  >= section.offsetTop + zone2.offsetHeight - otstup ||
        draggableElem.offsetLeft + draggableElem.offsetWidth  >= zone2.offsetLeft + zone2.offsetWidth - otstup
        )        {
         
          draggableElem.classList.add('neon');
        }
        else {
          draggableElem.classList.remove('neon');
        }
    
      // (draggableElem.id == 'home' && (draggableElem.offsetTop <= section.offsetTop + 200 || draggableElem.offsetTop >= zone2.offsetLeft + zone2.offsetWidth -500) )
     
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