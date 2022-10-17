const xStep = 200
const yStep = 100
let xFirst = 600
let yFirst = 1000

// let xLast = -1 // начальный x который мы будем перезаписывать и хранить последнее значение
// let yLast = -1
let block_left = 0
let block_right = 0
let first = 0

const PADDING = 40
// первые значения в пикселях
const WIDTH = 600 
const HEIGHT = 700
// вторые значения DPI (кол-во условных единиц)
const DPI_WIDTH = WIDTH * 2 // для более плавной графики 
const DPI_HEIGHT = HEIGHT * 2

const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2 // реальная размерность графика, где мы работаем с эл. отрисовки
const ROWS_COUNT = 10 // количество параллельных линий
const ctx = document.getElementById('canvas').getContext('2d')
document.getElementById('canvas').style.width = WIDTH + 'px' // размеры самого канваса
document.getElementById('canvas').height = HEIGHT + 'px' 
document.getElementById('canvas').width = DPI_WIDTH // количество точек у канваса
document.getElementById('canvas').height = DPI_HEIGHT

// ==================================== y axis (параллельные линии)
const step = VIEW_HEIGHT / ROWS_COUNT // шаг (высота отрисованной области на кол-во строчек)
const textStep = 1000 / ROWS_COUNT //  (yMax - yMin)  ~~~~ особый шаг с учётом максиального и минимального значений по y
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

/*
class Branch {
  node_mass = []

  constructor(node_mass = 0, category){
    this.node_mass = node_mass 
    this.category = category
  }

  add_node_to_branch(node){
    this.node_mass.noda
  }
}

let branch_1 = new Branch([node_1,node_2,node_3], 'm')
*/

class Node { // конкретные записи
  constructor(id, parent_l, parent_c, parent_r ) {
    this.id = id;
    this.parent_c = parent_c
    this.parent_l = parent_l
    this.parent_r = parent_r
  }
  
  paint_circle (id, parent_l, parent_c, parent_r) {
    ctx.beginPath()
      ctx.arc(DPI_WIDTH/2, PADDING, 10, 0, 360, false) // центрX, центрY, радиус px, начало угла, конец угла, против часовой?)
      ctx.fill()
    ctx.closePath()
  }

  paint_line_to (id, parent_l, parent_c, parent_r) {
    ctx.lineWidth = 4 // толщина линии
    ctx.strokeStyle = 'green' // цвет графики

    ctx.lineTo (xFirst, DPI_HEIGHT - PADDING - (yFirst + xStep) ) // * yRatio) в оперативной нарисовали (вычисляются координаты для линий)
    xFirst = xFirst
    yFirst = yFirst + xStep
    // console.log(xLast, yLast)
    
    ctx.stroke() // отрисуй из ОП мои маракули 
  ctx.closePath() // конец работы канваса
  }
} 

let node_1 = new Node(1, -1, -1, -1)
node_1.paint_circle()

let node_2 = new Node(2, -1, 1, -1)
// node_2.paint_circle()
//node_2.paint_line_to()

// let node_3 = new Node(3, -1, 1, -1)

/*
class Tree { 
  category = [ 'm', 'k', 'med']

    constructor(amount_category) {
      this.amount_category = amount_category; // принимает категории (моделирование ...)
    }

    add_branch(branch){
      // todo: цикл по узлам по node_mass
      branch.node_mass[i]
      // вставка ветки в дерево (создание ветки для категории)
    }

    render(){ // отрисовка данной категории  

    }
}

let Tree = new Tree(['m', 'k']);
Tree.add_branch(branch_1)
*/