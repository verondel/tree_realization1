document.querySelector("#button").onclick = function(){
  console.log('кнопка')
}

let first = 0
const PADDING = 40
// первые значения в пикселях
const WIDTH = 600
const HEIGHT = 700

// вторые значения DPI (кол-во условных единиц)
const DPI_WIDTH = WIDTH * 2 // для более плавной графики 
const DPI_HEIGHT = HEIGHT * 2

// 
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2 // реальная размерность графика, где мы работаем с эл. отрисовки

const ROWS_COUNT = 10 // количество параллельных линий

function chart(canvas, data) {
  const ctx = canvas.getContext('2d')
  canvas.style.width = WIDTH + 'px' // размеры самого канваса
  canvas.style.height = HEIGHT + 'px' 
  canvas.width = DPI_WIDTH // количество точек у канваса
  canvas.height = DPI_HEIGHT
  const [yMin,yMax] = computeBoundaries(data) 
  const yRatio = VIEW_HEIGHT / (yMax - yMin)

  if (first != 1){
    ctx.beginPath()
      ctx.arc(DPI_WIDTH/2, PADDING, 10, 0, 360, false) // центрX, центрY, радиус px, начало угла, конец угла, против часовой?)
      ctx.fill()
    ctx.closePath()
    first = 1
  }

  // === y axis (параллельные линии)
  const step = VIEW_HEIGHT / ROWS_COUNT // шаг (высота отрисованной области на кол-во строчек)
  const textStep = (yMax - yMin) / ROWS_COUNT // ~~~~ особый шаг с учётом максиального и минимального значений по y
  console.log(textStep)
  
  ctx.beginPath() // начало работы канваса, 
  ctx.strokeStyle = '#bbb' // цвет линий
  ctx.font = 'normal 20px Helvetica, sans-serif' 
  ctx.fillStyle = '#96a2aa'

  for (let  i = 1; i<= ROWS_COUNT; i++){ // сама отрисовка параллельных линий (не с 0, тк 0*step=0)
    const y  = step * i // определение координаты y 
    const text = textStep * i // yMax - 
    ctx.fillText(text.toString(), 5, y + PADDING - 10) // отображение текста ("что передаём", x , y)
    ctx.moveTo(0, y + PADDING) // перемещается пошагово по вертикали (иначе перекос влево), PADDING нужен для отступа снизу
    ctx.lineTo(DPI_WIDTH, y + PADDING) // (по всей ширине графика, y) (иначе перекос вправо)
  }
  ctx.stroke()
  ctx.closePath() // конец работы канваса
  // =================================================

  ctx.beginPath() // начало работы канваса
  ctx.lineWidth = 4 // толщина линии
  ctx.strokeStyle = 'green' // цвет графики
  for (const [x,y] of data) {
    ctx.lineTo (x,DPI_HEIGHT - PADDING - y * yRatio) // в оперативной нарисовали (вычисляются координаты для линий)
    /* 
      DPI_HEIGHT - y"
      Координаты в канвасе работают по другому: в стандартном виде "y" слева наверху, 
      поэтому из полной высоты вычитаем координату y
    */
    //ctx.arc(x, y, 10, 0, 360, false) // центрX, центрY, радиус px, начало угла, конец угла, против часовой?)
  }
  ctx.stroke() // отрисуй из ОП мои маракули 
  ctx.closePath() // конец работы канваса
}

function computeBoundaries(data){ // ~~~~ вычисление максимального и минимального значений по y
  let min
  let max 

  for (const [,y] of data){
    if (typeof min !== 'number') min = y
    if (typeof max !== 'number') max = y

    if (min > y) min = y
    if (max < y) max = y
  }
  return [min,max] // кортеж
}

// chart(document.getElementById('chart'), [
//   [600,1000],
//   [600,900],
//   [300,900],
//   [300,800],
// ])

chart(document.getElementById('chart'), [
  [600,1000],
  [600,900],
  [300,900],
  [300,800],
  [300,700],
  [600,500],
  [1000, 120],
  [1200, 0]
])

let flag = 0 // дерево ещё не отрисовано один раз

let xLast = 600 // начальный x который мы будем перезаписывать и хранить последнее значение
let yLast = 1000
id1 = {  id: 1 ,  parent_c: None, parent_r: None, parent_l: None, tp_cycle: "dead_end"  } 
id2 = {  id: 2 ,  parent_c: id1, parent_r: None, parent_l: None, tp_cycle: "dead_end"  } 
id3 = {  id: 2 ,  parent_c: None, parent_r: id2, parent_l: None, tp_cycle: "dead_end"  } 

nodes = [id1, id2, id3 ]

// function define_coordinates(id) { // по родителям определяем положение элемента
//   let xCurr
//   let yCurr
//   if (parent_c != None) { 
//     yCurr = xLast - yCurr
//     xLast = yCurr
//   }
  
// } 

// function build_tree(nodes) {  
//   if (flag == 0) {      // первый раз отрисовали
//     for (var obj in nodes) {       
//       create_element(obj)
//     }
//     flag = 1
//   } else { // отрисовываем не в первый раз => добавляем новый элемент
//     create_element(nodes.slice(-1)) // возьми название последнего элемента
//   }
// }

// function create_element(obj) {
//   if (obj.parent_c != Null )

//   //  todo: если есть родитель у узла то его нужно добавить parent_c
//   chart(canvas, data)

//   root = getElementById('tree')
//   // child = document.createElement('div');  
//   // child.setAttribute("id", obj.id);
//   // child.setAttribute("class", obj.tp_cycle);
//   root.appendChild(child)
// }


