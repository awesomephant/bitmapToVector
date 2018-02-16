var instructionsCount = 0;
function isEven(n) {
  return n % 2 == 0;
}
var clearSVG = function () {
  let elements = document.querySelectorAll("svg *");
  for (let i = 0; i < elements.length; i++) {
    elements[i].parentNode.removeChild(elements[i]);
  }
};
var bindControls = function () {
  let controls = document.querySelectorAll(".controls input");
  console.log(controls);
  for (let i = 0; i < controls.length; i++) {
    controls[i].addEventListener("input", function (e) {
      let val = e.srcElement.value;
      let id = e.srcElement.id;
      config[id] = val;
      drawShadedImage(greyscale);
      //drawImage(sourceImage);
    });
  }
};

var generateShading = function (value, area) {
  //area {x,y,width,height}
  let pointCount = (255 - value) * config.pointCountMultiplier;
  let points = []; // one dimensional array of polyline points
  for (var i = 0; i < pointCount; i++) {
    let x = area.x + area.width / pointCount * i;
    points.push(x);
    if (isEven(i)) {
      points.push(area.y);
    } else {
      points.push(area.y + area.height);
    }
  }
  let line = s.polyline(points);
  instructionsCount += points.length;
  line.attr({
    stroke: "#222",
    strokeWidth: 0.1,
    fill: "none"
  });
};

var generateShadingStochastic = function (value, area) {
  //area {x,y,width,height}
  let pointCount = (255 - value) * config.pointCountMultiplier;
  let points = []; // one dimensional array of polyline points
  area.width = area.width * config.pixelScaling 
  area.height = area.height * config.pixelScaling
  for (var i = 0; i < pointCount; i++) {
    let x = area.x + getRandomFloat(area.width * .2, area.width * 1.2);
    points.push(x);
    points.push(getRandomFloat(area.y - area.height * .2, area.y + area.height * 1.2));
  }
  let line = s.polyline(points);
  line.attr({
    stroke: "#222",
    strokeWidth: 0.1,
    fill: "none"
  });
};

var getAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum / arr.length;
};

var drawShadedImage = function (data, res, svgRes) {
  if (!res){
    res = config.resolution;
  }
  if (!svgRes){
    res = config.svgRes;
  }
  let cols = Math.round(width * res);
  let rows = Math.round(height * res);
  console.log("Rows:" + rows);
  console.log("Cols:" + cols);
  console.log("Data length:" + data.length);
  let yOffset = 0;
  let colCounter = 0;
  let drift = 0; //15mm
  for (var i = 0; i < data.length; i++) {
    if (colCounter >= cols) {
      // new row
      colCounter = 0;
      zigZagsPerRow = 0;
      yOffset += svgRes;
    }
    colCounter++;
    if (config.stochasticShading) {
      generateShadingStochastic(data[i], {
        x: svgRes * colCounter + drift,
        y: yOffset,
        width: svgRes,
        height: svgRes
      });
    } else {
      generateShading(data[i], {
        x: svgRes * colCounter + drift,
        y: yOffset,
        width: svgRes,
        height: svgRes
      });
    }
  }
};