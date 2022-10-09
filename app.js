const PADDING = 40
// первые значения в пикселях
const WIDTH = 600
const HEIGHT = 200 

// вторые значения DPI (кол-во условных единиц)
const DPI_WIDTH = WIDTH * 2 // для более плавной графики 
const DPI_HEIGHT = HEIGHT * 2

// 
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2 // реальная размерность графика, где мы работаем с эл. отрисовки

const ROWS_COUNT = 5 // количество параллельных линий

function chart(canvas, data) {
  const ctx = canvas.getContext('2d')
  canvas.style.width = WIDTH + 'px' // размеры самого канваса
  canvas.style.height = HEIGHT + 'px' 
  canvas.width = DPI_WIDTH // количество точек у канваса
  canvas.height = DPI_HEIGHT


  const [yMin,yMax] = computeBoundaries(data) // ~~~~
// ~~~~
  const yRatio = VIEW_HEIGHT / (yMax - yMin)
  console.log(yRatio)

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
    const text = yMax - textStep * i
    ctx.fillText(text.toString(), 5, y + PADDING - 10) // отображение текста ("что передаём", x , y)
    ctx.moveTo(0, y + PADDING) // перемещается пошагово по вертикали (иначе перекос влево), PADDING нужен для отступа снизу
    ctx.lineTo(DPI_WIDTH, y + PADDING) // (по всей ширине графика, y) (иначе перекос вправо)
  }
  ctx.stroke()
  ctx.closePath() // конец работы канваса
  // =================================================

  ctx.beginPath() // начало работы канваса
  ctx.lineWidth = 4 // толщина линии
  ctx.strokeStyle = 'red' // цвет графика ы
  for (const [x,y] of data) {
    ctx.lineTo (x,DPI_HEIGHT - PADDING - y * yRatio) // в оперативной нарисовали (вычисляются координаты для линий)
    /* 
      DPI_HEIGHT - y"
      Координаты в канвасе работают по другому: в стандартном виде "y" слева наверху, 
      поэтому из полной высоты вычитаем координату y
    */
  }
  ctx.stroke() // отрисуй из ОП мои маракули 
  ctx.closePath() // конец работы канваса
}

chart(document.getElementById('chart'), [
  [0,0],
  [200,100],
  [400,100],
  [600,200],
  [800,80],
  [1000, 120],
  [1200, 0]
])

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


