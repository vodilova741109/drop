// вводные данные
const formUchastok = document.querySelectorAll(".form-uchastok input");
(elem = document.querySelectorAll(".obc input")),
  (elemType = document.querySelectorAll('input[name="elem-type[]"]')),
  (inputParam = document.querySelectorAll("fieldset .fusion-form-checkbox")),
  (section = document.querySelector("section")),
  (wrapper = document.querySelector(".wrapper")),
  (zone1 = document.querySelector(".zone")),
  (container = document.querySelector(".container")),
  (blockPading = document.querySelector(".block-ots")),
  (btnControle = document.querySelector(".calc-control"));
let draggableElems = document.querySelectorAll(".draggable");
// добавить картинку и див под инпуты
function addImagEndInput() {
  for (let i = 0; i < elem.length; i++) {
    const inputElement = document.createElement("div");
    elem[i].addEventListener("change", (e) => {
      e.preventDefault;
      elem[i].setAttribute("checked", "true");

      if (elem[i].checked && elem[i].value === draggableElems[i].id) {
        // добавляет img и див под инпуты
        draggableElems[i].classList.remove("d-none");
        // console.log(draggableElems[i])
        addInput(i, inputElement);
      } else {
        // удаляет img и див под инпуты
        draggableElems[i].classList.add("d-none");
        inputParam[i].removeChild(inputElement);
      }
    });
  }
}
addImagEndInput();
// функция добавляет в див инпуты  или кнопки
function addInput(i, inputElement) {
  inputElement.classList.add("param");
  let nameEl = draggableElems[i].id;

  if (
    draggableElems[i].id == "minDer" ||
    draggableElems[i].id == "maxDer" ||
    draggableElems[i].id == "cust" ||
    draggableElems[i].id == "zvety"
  ) {
    inputElement.innerHTML = `<button id="${nameEl}" class="btnFrm btn-more ">+</button><button id="${nameEl}" class="btnFrm btn-less">-</button>`;
    inputParam[i].appendChild(inputElement);
    addAndDelElem(nameEl);
  } else {
    inputElement.innerHTML =
      '<input class="height" type="number" min="1" max="100" placeholder="5" value="60"> Площадь(м2) ';
    inputParam[i].appendChild(inputElement);
  }
}

// функция добавляет количество картинок
function addAndDelElem(nameEl) {
  const btnMore = document.querySelectorAll(".btn-more");
  const btnLess = document.querySelectorAll(".btn-less");
  const boxs = document.querySelector(".box__row");
 
  function addElem(){
    for (let i = 0; i < btnMore.length; i++) {    
      if (btnMore[i]) {
        btnMore[i].addEventListener("click", (e) => {
          e.preventDefault();
          target = e.target;
          let otstup = 1,
            num = 11;
          switch (target.id) {
            case "maxDer":
              otstup = 3;
              num = 9;
              break;
            case "minDer":
              otstup = 2;
              num = 8;
              break;
            case "cust":
              otstup = 1;
              num = 10;
              break;
            default:
              break;
          }     
           
          if (target.id) {
            const el = document.createElement("div");
            el.classList.add(nameEl);
            el.innerHTML = `<span data-tooltip="Отступ ${otstup}м" class="draggable img${num}" draggable="true" id="${nameEl}"></span>`;
            boxs.appendChild(el);   
            const draggableElemsNew = document.querySelectorAll(".draggable");        
            dragMoveDevais(draggableElemsNew);
          }
        });
      }
    }
   
  }
  addElem();
 
  function delElem(){
    for (let i = 0; i < btnLess.length; i++) {    
      if (btnLess[i]) {
        btnLess[i].addEventListener("click", (e) => {
          e.preventDefault();
          target = e.target;     
     
         
          let elDelete = document.querySelectorAll(`.${nameEl}`)
        
          var last = elDelete[elDelete.length - 1];     
          last.remove();  
            const draggableElemsNew = document.querySelectorAll(".draggable");     
            dragMoveDevais(draggableElemsNew);
        });
      }
    }
  }
  delElem();

  function addDisabled(){
    let target = document.querySelectorAll('.param');
    for (let i = 0; i < target.length; i++) {   
      target[i].addEventListener("click", (e) => {
        e.preventDefault();
        target = e.target;     
  
       
        let elem = document.querySelectorAll(`.${nameEl}`); 
   
  
        if(target.classList.contains('btn-more')) {  
          btnLess[i].classList.remove("btn-disabled");
          btnLess[i].disabled = false;  
          if(elem.length > 4){     
            target.disabled = true;
            target.classList.add("btn-disabled"); 
          }      
          else{
            btnLess[i].classList.remove("btn-disabled");
            btnLess[i].disabled = false; 
            target.disabled = false;
            target.classList.remove("btn-disabled");         
          }  
        }
   
        if(target.classList.contains('btn-less')){
          btnMore[i].classList.remove("btn-disabled");
          btnMore[i].disabled = false;
          if(elem.length <= 0){
            target.disabled = true;
            target.classList.add("btn-disabled"); 
          }      
          else{
            target.disabled = false;
            target.classList.remove("btn-disabled");        
          }  
        }
        })
      
    }
  }
  addDisabled();
}

// функция получения и передачи параметров инпутов
function getParam() {
  container.style.height = formUchastok[1].value * 150 + "px";
  container.style.width = formUchastok[0].value * 150 + "px";
  inputParam.forEach((item, index) => {
    const blockParam = item.querySelectorAll("input");     
    if (blockParam[0].checked) { 
      for (let i = 0; i < draggableElems.length; i++) {
        if (blockParam[1] != undefined && draggableElems[i].id == blockParam[0].value) {             
            draggableElems[i].style.height = Math.sqrt(blockParam[1].value) * 15 + "px";
            draggableElems[i].style.width =  Math.sqrt(blockParam[1].value) * 15 + "px";                         
        }
      }
    }
  });
}

//событиe передачи параметров
function start() {
  btnControle.addEventListener("click", (e) => {
    e.preventDefault();
    getParam();
    // draggableElemsNew = document.querySelectorAll('.draggable');
    // console.log(draggableElemsNew)
    // dragMoveDevais(draggableElemsNew);
  });
}
start();

function dragMoveDevais(draggableElemsNew) {
  if (draggableElemsNew) {
    draggableElems = draggableElemsNew;
  }
  // console.log(draggableElemsNew)

  for (let draggableElem of draggableElems) {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // код для мобильных устройств
      // console.log('мобильник');
      draggableElem.addEventListener("touchmove", dragMove);
      function dragMove(event) {
        event.preventDefault();
        // индекс кол-во пальцев
        let touch = event.targetTouches[0];
        draggableElem.style.position = "absolute";
        // передаем координаты и вычисляем относительно обертки и центра самого себя
        draggableElem.style.top = `${
          touch.pageY - wrapper.offsetTop - draggableElem.offsetHeight / 2
        }px`;
        draggableElem.style.left = `${
          touch.pageX - wrapper.offsetLeft - draggableElem.offsetWidth / 2
        }px`;
        // 15 px border container
        drag(container.offsetTop, 15, 0);
      }
    } else {
      // код для обычных устройств
      // console.log('обычное');

      draggableElem.onmousedown = function (e) {
        //  получаем координаты элементы left и top, высоту и ширину перемещаемого элемента
        const coords = getCoords(draggableElem),
          dragHeight = draggableElem.offsetHeight,
          dragWidth = draggableElem.offsetWidth;

        const shiftX = e.pageX - coords.left;
        const shiftY = e.pageY - coords.top;

        // подготовить к перемещению
        // 2. разместить на том же месте, но в абсолютных координатах
        draggableElem.style.position = "absolute";
        // переместим в section, чтобы мяч был точно не внутри position:relative
        section.appendChild(draggableElem);
        //  вызываем функцию
        moveAt(e);
        draggableElem.style.zIndex = 1000; // над другими элементами

        // передвинуть элемент под координаты курсора
        // и сдвинуть на половину ширины/высоты для центрирования
        function moveAt(e) {
          draggableElem.style.top = e.pageY - shiftY + "px";
          draggableElem.style.left = e.pageX - shiftX + "px";
          // ограничения
          // 15 px border container + 20px padding section
          drag(wrapper.offsetTop, 15, 20);
        }
        document.onmousemove = function (e) {
          moveAt(e);
        };
        // событие отпускания
        draggableElem.onmouseup = function () {
          document.onmousemove = null;
          draggableElem.onmouseup = null;
        };
      };
    }
    // Отмена действия браузера по событию dragstart.
    draggableElem.ondragstart = function () {
      return false;
    };
    // touchmove

    function drag(Top, ots, ots2) {
      // по высоте

      if (draggableElem.offsetTop <= Top) {
        draggableElem.style.top = `${Top + ots}px`;
      } else if (
        draggableElem.offsetTop + draggableElem.offsetHeight >=
        Top + container.offsetHeight
      ) {
        draggableElem.style.top = `${
          Top + container.offsetHeight - draggableElem.offsetHeight - ots
        }px`;
      }
      // по ширине
      if (draggableElem.offsetLeft <= container.offsetLeft) {
        draggableElem.style.left = `${container.offsetLeft + ots + ots2}px`;
        // console.log(container.offsetLeft)
      } else if (
        draggableElem.offsetLeft + draggableElem.offsetWidth >=
        container.offsetLeft + container.offsetWidth
      ) {
        draggableElem.style.left = `${
          container.offsetLeft +
          container.offsetWidth +
          ots / 2 -
          draggableElem.offsetWidth
        }px`;
      }
      // условия отступа
      let otstup = 15;
      switch (draggableElem.id) {
        case "home":
        case "maxDer":
        case "banya":
        case "vodoem":
          otstup = 45;
          break;
        case "minDer":
        case "hozp":
          otstup = 30;
          break;    
        case "zvety":  
        otstup = -20;
        break;
        default:          
        break;
      }
      

      if (
        draggableElem.offsetTop < Top + ots + otstup - 2 ||
        draggableElem.offsetLeft < container.offsetLeft + ots + ots2 + otstup ||
        draggableElem.offsetTop + draggableElem.offsetHeight >
          Top + container.offsetHeight - ots - otstup ||
        draggableElem.offsetLeft + draggableElem.offsetWidth >
          container.offsetLeft + ots2 + container.offsetWidth - ots - otstup + 2
      ) {
        if(draggableElem.id != 'zvety')
        draggableElem.classList.add("neon");
        // console.log(wrapper.offsetTop + container.offsetHeight -draggableElem.offsetHeight-ots -otstup);
        // console.log(wrapper.offsetTop,container.offsetHeight,draggableElem.offsetHeight,ots,otstup);
      } else {
        draggableElem.classList.remove("neon");
      }
    }
  }
}
dragMoveDevais();

function getCoords(elem) {
  // кроме IE8-
  // возвращает размер элемента и его позицию относительно viewport
  const box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}
