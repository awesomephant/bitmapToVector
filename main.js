var c, greyscale, width, height, sourceImage;
var config = {
  greyValue: 100,
  pointCountMultiplier: .15,
  resolution: .08,
  svgRes: 15,  
};
var mapRange = function(n, range, targetRange) {
  var x =
    (n - range[0]) / (range[1] - range[0]) * (targetRange[1] - targetRange[0]) +
    targetRange[0];
  return x;
};

var drawCanvas = function(arr) {
  let imageData = c.createImageData(width * config.resolution, height * config.resolution);
  var data = imageData.data;
  for (var i = 0; i < arr.length; i++) {
    data[i] = arr[i];
  }
  c.putImageData(imageData, 0, 0);
};

var processImageData = function(data) {
  // data is a one-dimensional array of each pixel in the image.
  //Each pixel is represented by four values: RGBA
  //So what we need to do is:
  //1. Add RGB (ignore A), map to [0,255] to get a grey value
  greyscale = [];
  greyscaleRGBA = [];
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];
    let value = r * 1 + g * 1 + b * 1; // weight channels
    value = Math.round(mapRange(value, [0, 255 * 3], [0, 255]));
    greyscale.push(value);
  }

  // Then we need to re-expand this array into RGBA, with RGB being the same and A = 1
  for (let i = 0; i < greyscale.length; i += 1) {
    greyscaleRGBA.push(greyscale[i]);
    greyscaleRGBA.push(greyscale[i]);
    greyscaleRGBA.push(greyscale[i]);
    greyscaleRGBA.push(255);
  }
  console.log(greyscaleRGBA.length)
  drawCanvas(greyscaleRGBA);
};

var drawImage = function(img) {
  c.clearRect(0,0,width, height);
  let w = Math.round(width * config.resolution);
  let h = Math.round(height * config.resolution);
  c.drawImage(img, 0, 0, w, h);
  let imageData = c.getImageData(0, 0, w, h);
  processImageData(imageData.data);
};

var init = function() {
  let canvas = document.getElementById("world");
  sourceImage = document.getElementById("source");
  c = canvas.getContext("2d");
  width = sourceImage.naturalWidth;
  height = sourceImage.naturalHeight;
  c.canvas.width = width;
  c.canvas.height = height;
  drawImage(sourceImage);
  console.log(width)
  console.log(height)
};

init();
