const resolutions = [.1];
//const resolutions = [.03];

init(function(){
    bindControls();
    clearSVG();
    for (let i = 0; i < resolutions.length; i++){
        config.resolution = resolutions[i]
        drawImage(sourceImage);
        let svgRes = .8 / resolutions[i]
        drawShadedImage(greyscale, resolutions[i], svgRes);
    }
});