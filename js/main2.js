

let canvas = document.getElementById('myCanvas')
canvas.width = 600
canvas.height = 600

let ctx = canvas.getContext('2d')

/* 1o traingolo in alto a sinistra */
ctx.beginPath()
ctx.moveTo(300,100)
ctx.lineTo(300,300)
ctx.lineTo(200,300)
ctx.closePath()
ctx.stroke()

/* 2o triangolo in alto a destra */
ctx.beginPath()
ctx.moveTo(300,100)
ctx.lineTo(400,300)
ctx.lineTo(300,300)
ctx.stroke()

ctx.beginPath()
ctx.moveTo(300,300)
ctx.lineTo(300,500)
ctx.stroke()





