const xStep = 200
const yStep = 110
let xFirst = 600
let yFirst = 40

// let xLast = -1 // начальный x который мы будем перезаписывать и хранить последнее значение
// let yLast = -1
let block_left = 0
let block_right = 0
let first = 0

const PADDING = 70
// первые значения в пикселях
const WIDTH = 600 
const HEIGHT = 895
// вторые значения DPI (кол-во условных единиц)
const DPI_WIDTH = WIDTH * 2 // для более плавной графики 
const DPI_HEIGHT = HEIGHT * 2

const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2 // реальная размерность графика, где мы работаем с эл. отрисовки
const ROWS_COUNT = 15 // количество параллельных линий
const ctx = document.getElementById('canvas').getContext('2d')

document.getElementById('canvas').style.width = WIDTH + 'px' // размеры самого канваса DOM элемент
document.getElementById('canvas').style.height = HEIGHT + 'px' 
document.getElementById('canvas').width = DPI_WIDTH // количество точек у канваса
document.getElementById('canvas').height = DPI_HEIGHT



// ============================================ y axis (параллельные линии) ====
const step = VIEW_HEIGHT / ROWS_COUNT // шаг (высота отрисованной области на кол-во строчек)
//console.log('pipka',VIEW_HEIGHT / ROWS_COUNT, VIEW_HEIGHT, ROWS_COUNT)
const textStep = (DPI_HEIGHT-PADDING*2) / ROWS_COUNT //  (yMax - yMin)  ~~~~ особый шаг с учётом максиального и минимального значений по y
console.log('step', textStep)

ctx.beginPath() // начало работы канваса, 
  ctx.strokeStyle = '#bbb' // цвет линий
  ctx.font = 'normal 20px Helvetica, sans-serif' 
  ctx.fillStyle = '#96a2aa'

  for (let  i = 0; i<= ROWS_COUNT; i++){ // сама отрисовка параллельных линий (не с 0, тк 0*step=0)
    const y  = step * i // определение координаты y 
    const text = textStep * i // yMax - 
    ctx.fillText(text.toString(), 5, y + PADDING - 10) // отображение текста ("что передаём", x , y)
    
    ctx.moveTo(0, y + PADDING) // перемещается пошагово по вертикали (иначе перекос влево), PADDING нужен для отступа снизу
    ctx.lineTo(DPI_WIDTH, y + PADDING) // (по всей ширине графика, y) (иначе перекос вправо)
  }
  ctx.stroke()
  ctx.closePath() // конец работы канваса
// =============================================================================

function circle(){

}

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
  

  paint_circle_first (id, parent_l, parent_c, parent_r) {
    ctx.beginPath()
      // ctx.arc(DPI_WIDTH/2, PADDING, 10, 0, 360, false) // центрX, центрY, радиус px, начало угла, конец угла, против часовой?)
      ctx.strokeStyle = "red";
      ctx.fillStyle = "white";
      ctx.lineWidth = "4"
      ctx.arc(DPI_WIDTH/2, PADDING, 20, 0, 360, false); // центрX, центрY, радиус px, начало угла, конец угла, против часовой?)
      console.log('First circle', DPI_WIDTH/2, PADDING);
      ctx.fill();
      ctx.stroke();
      
    ctx.closePath()
    //console.log('DPI_W', DPI_WIDTH, ' P', PADDING)
  }

  paint_circle (id, parent_l, parent_c, parent_r) {
    if (this.parent_c == 1){
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.fillStyle = "white";
        ctx.arc(DPI_WIDTH/2, ((this.id-1)*110+ PADDING) , 20, 0, 360, false);
        ctx.fill();
        ctx.stroke();
      ctx.closePath();
      //console.log('id', this.id , ((this.id-1)*110+PADDING))
    } 
    if (this.parent_l == 1 ){
      ctx.beginPath()
        ctx.arc(DPI_WIDTH/2 - 200, ((this.id-1)*110+PADDING), 20, 0, 360, false) 
        ctx.fill();
        ctx.stroke()
      ctx.closePath()
      //console.log(this.id , (this.id*110)- PADDING*2)
    }
    if (this.parent_r == 1) {
      ctx.beginPath()
        ctx.arc(DPI_WIDTH/2 + 200, ((this.id-1)*110+PADDING), 20, 0, 360, false) // //// (this.id*110) - PADDING*2
        ctx.fill();
        ctx.stroke()
      ctx.closePath()
      //console.log(this.id , (this.id*110)- PADDING*2)
    }
  }

  paint_line_to (id, parent_l, parent_c, parent_r) {
  ctx.beginPath()
    ctx.lineWidth = 4 // толщина линии
    ctx.strokeStyle = 'green' // цвет графики
    

    if (this.parent_c == 1) {
      ctx.moveTo(DPI_WIDTH/2, PADDING + (this.id-2)*yStep + 22 ) // 22, чтобы не накладывался на круг
      ctx.lineTo(DPI_WIDTH/2, PADDING+(this.id-2)*yStep+yStep - 22);  // DPI_HEIGHT - PADDING - y * yRatio // * yRatio) в оперативной нарисовали (вычисляются координаты для линий)
      ctx.stroke() // отрисуй из ОП мои маракули 
    }

    if (this.parent_l == 1) {
      // налево
      ctx.moveTo(DPI_WIDTH/2 - 22,  PADDING + (this.id-2)*yStep ) //(this.id-1)*110 - PADDING*2
      ctx.lineTo(DPI_WIDTH/2-200, PADDING + (this.id-2)*yStep); // (this.id-1)*110 - PADDING*2 
      ctx.stroke() 

      // вниз
      ctx.moveTo(DPI_WIDTH/2-200, PADDING + (this.id-2)*yStep)
      ctx.lineTo(DPI_WIDTH/2-200, PADDING + (this.id-2)*yStep+yStep - 22); 
      ctx.stroke()  
    }

    if (this.parent_r == 1) {
      // право
      ctx.moveTo(DPI_WIDTH/2 + 22,  PADDING + (this.id-2)*yStep ) //(this.id-1)*110 - PADDING*2
      ctx.lineTo(DPI_WIDTH/2+200, PADDING + (this.id-2)*yStep); // (this.id-1)*110 - PADDING*2 
      ctx.stroke() 

      // вниз
      ctx.moveTo(DPI_WIDTH/2+200, PADDING + (this.id-2)*yStep)
      ctx.lineTo(DPI_WIDTH/2+200, PADDING + (this.id-2)*yStep+yStep - 22); 
      ctx.stroke() 
    }

    // if (this.parent_l == 1) {
    //   ctx.moveTo(xFirst, yFirst)
    //   ctx.lineTo(xFirst, yFirst + yStep);  // DPI_HEIGHT - PADDING - y * yRatio // * yRatio) в оперативной нарисовали (вычисляются координаты для линий)
    //   ctx.stroke() // отрисуй из ОП мои маракули 
    //   xFirst = xFirst    // перезаписываем переменные 
    //   yFirst = yFirst + yStep
    // }
  ctx.closePath() // конец работы канваса
  }
} 

let node_1 = new Node(1, -1, -1, -1) // начало 
node_1.paint_circle_first()

let node_2 = new Node(2, 0, 1, 0) // середина 
node_2.paint_circle()
node_2.paint_line_to()

let node_3 = new Node(3, 1, 1, 1) // слева
node_3.paint_circle()
node_3.paint_line_to()

let node_4 = new Node(4, -1, 1, -1) // справа
node_4.paint_circle()

let node_5 = new Node(5, -1, 1, -1)
node_5.paint_circle()


// общие координаты 
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