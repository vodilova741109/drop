const wrapper = document.querySelector('.wrapper'),
    empty= document.querySelectorAll('.empty'),
 draggableElems = document.querySelectorAll('.draggable');



for ( let draggableElem of draggableElems ) {
  // draggableElem.touchstart = drag;
  draggableElem.addEventListener('touchmove', dragMove);
  draggableElem.addEventListener('touchend', dragDrop);
  let itemAppend;

    function dragMove(event) {    
        event.preventDefault();
        // индекс кол-во пальцев
        let touch = event.targetTouches[0];
        

        // передаем координаты и вычисляем относительно обертки и центра самого себя
        draggableElem.style.top = `${touch.pageY - wrapper.offsetTop - (draggableElem.offsetHeight/2)}px`;
        draggableElem.style.left = `${touch.pageX - wrapper.offsetLeft - (draggableElem.offsetWidth/2)}px`;

        empty.forEach(item =>{
            if(draggableElem.getBoundingClientRect().top + draggableElem.offsetHeight / 2 < item.getBoundingClientRect().bottom &&
                draggableElem.getBoundingClientRect().right - draggableElem.offsetWidth / 2 > item.getBoundingClientRect().left &&        
                draggableElem.getBoundingClientRect().bottom - draggableElem.offsetHeight / 2 > item.getBoundingClientRect().top &&
                draggableElem.getBoundingClientRect().left + draggableElem.offsetWidth / 2 < item.getBoundingClientRect().right
            ){
                item.classList.add('active');
                itemAppend = item;
            }
            else {
                item.classList.remove('active');
            }

        })
    
        // getBoundingClientRect - возвращает все коррдинаты по оси Х и У
       
        }

    function dragDrop() {
        if(itemAppend.classList.contains('active'))
        itemAppend.append(this);
        itemAppend.style.width = `${this.offsetWidth}px`;
        itemAppend.style.height = `${this.offsetHeight}px`;
        this.style.top = `${itemAppend.offsetTop}px`;
        this.style.left = `${itemAppend.offsetLeft}px`;
         // getBoundingClientRect - возвращает все коррдинаты по оси Х и У
        console.log(itemAppend.getBoundingClientRect());
       
    }
}


  