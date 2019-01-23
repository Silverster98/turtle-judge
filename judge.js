var bg = { // 背景颜色rgb
  r : 0,
  g : 0,
  b : 0
}


window.onload = function () { // 制作模板图片
  (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'tempcanvas';

  // 制作模板图片的 python 代码
  const pycode = `import turtle
t2 = turtle.Turtle()
t2.speed(0)
t2.color('red')
t2.fd(100)`
  
  runit(pycode);

  setTimeout(() => {
    generate();
  }, 50)
}

function generate () { // 将图像设置透明，同时只保留一个 canvas
  let td = document.getElementById('tempcanvas');
  td.lastChild.style.marginTop = 0;
  td.removeChild(td.firstChild);

  let canvas = td.firstChild;
  let ctx = canvas.getContext('2d');
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;

  for(let i = 3; i < data.length; i += 4){ // 非背景像素透明值改为64
    if(data[i-3] === bg.r && data[i-2] === bg.g && data[i-1] === bg.b) continue;
    else data[i] = 64;
  }

  imageData.data = data;
  ctx.putImageData(imageData, 0, 0);

  (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'usercanvas';
}

function calculate () {
  let tempdata = getTempData();
  let answer = getJudgeAnswer(tempdata);

  let ansp = document.getElementById('answer');
  ansp.innerHTML = `pc/pv = ${answer[0].toFixed(4)}, po/pv = ${answer[1].toFixed(4)}, pe/pv = ${answer[2].toFixed(4)}`;
}

function getJudgeAnswer (tempdata) { // 计算指标
  let usercanvas = document.getElementById('usercanvas');
  let canvas = usercanvas.lastChild;
  let ctx = canvas.getContext('2d');
  let userImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
  let userData = userImageData.data;

  // calculate
  let pc = 0;
  let po = 0;
  let pe = 0;
  let pv = 0;
  for (let i = 3; i < tempdata.length; i += 4) {
    if (tempdata[i-3] === bg.r && tempdata[i-2] === bg.g && tempdata[i-1] === bg.b) {
      if (userData[i-3] !== bg.r || userData[i-2] !== bg.g || userData[i-1] !== bg.b) 
      	po ++;
    }
    else {
      pv ++;
      if (tempdata[i-3] === userData[i-3] && tempdata[i-2] === userData[i-2] && tempdata[i-1] === userData[i-1]) 
        pc ++;
      else 
        pe ++;
    }
  }

  console.log(`pc = ${pc}, po = ${po}, pe = ${pe}, pv = ${pv}`);

  return [pc/pv, po/pv, pe/pv];
}

function getTempData () { // 获取模板像素数据
  let tc = document.getElementById('tempcanvas');
  let canvas = tc.firstChild;
  let ctx = canvas.getContext('2d');
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  return imageData.data;
}