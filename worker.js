var running = false;
var finished = false;

function startWorker(thermImgData, msaImgData, minTemp, maxTemp) {
    var xtarget = msaImgData.data.length;
    var thermImgDataAr = thermImgData.data;
    var msaImgDataAr = msaImgData.data;
    for (var xidx = 0; xidx < xtarget && running; xidx += 4) {
        var temp = getTemp(thermImgDataAr[xidx],
            thermImgDataAr[xidx + 1],
            thermImgDataAr[xidx + 2]);
        if (minTemp < temp && temp < maxTemp) {
            msaImgDataAr[xidx] = thermImgDataAr[xidx];
            msaImgDataAr[xidx + 1] = thermImgDataAr[xidx + 1];
            msaImgDataAr[xidx + 2] = thermImgDataAr[xidx + 2];
        }
    }
    finished = running;
    running = false;
};
function getTemp(cc1, cc2, cc3) {
    var oIdx = 0;
    var i = 0;
    var c2 = colorComparision(cc1, cc2, cc3, colors[oIdx]);
    for (; i < colors.length; i++) {
        var c1 = colorComparision(cc1, cc2, cc3, colors[i]);
        if (c1 < c2) {
            oIdx = i;
            c2 = c1;
        }
    }
    return temps[oIdx];
}
function colorComparision(c1, c2, c3, color2) {
    return ((c1 - color2[0]) * (c1 - color2[0]) +
        (c2 - color2[1]) * (c2 - color2[1]) +
        (c3 - color2[2]) * (c3 - color2[2]));
}
var temps = [60, 58.75, 58.125, 57.5, 56.875, 56.25, 55.625, 55, 54.375, 53.75, 53.125, 52.5, 51.875, 51.25, 50.625, 50, 49.375, 48.75, 48.125, 47.5, 46.875, 46.25, 45.625, 45, 44.375, 43.75, 43.125, 42.5, 41.875, 41.25, 40.625, 40, 39.375, 38.75, 38.125, 37.5, 36.875, 36.25, 35.625, 35, 34.375, 33.75, 33.125, 32.5, 31.875, 31.25, 30.625, 30, 29.375, 28.75, 28.125, 27.5, 26.875, 26.25, 25.625, 25, 24.375, 23.75, 23.125, 22.5, 21.875, 21.25, 20.625, 20, 19.375, 18.75, 18.125, 17.5, 16.875, 16.25, 15.625, 15, 14.375, 13.75, 13.125, 12.5, 11.875, 11.25, 10.625, 10, 9.375, 8.75, 8.125, 7.5, 6.875, 6.25, 5.625, 5, 4.375, 3.75, 3.125, 2.5, 1.875, 1.25, 0.625, 0, -0.625, -1.25, -1.875, -2.5, -3.125, -3.75, -4.375, -5, -5.625, -6.25, -6.875, -7.5, -8.125, -8.75, -9.375, -10, -10.625, -11.25, -11.875, -12.5, -13.125, -13.75, -14.375, -15, -15.625, -16.25, -16.875, -17.5, -18.125, -18.75, -19.375, -20, -20.625, -21.25, -21.875, -22.5, -23.125, -23.75, -24.375, -25, -25.625, -26.25, -26.875, -27.5, -28.125, -28.75, -29.375, -30, -30.625, -31.25, -31.875, -32.5, -33.125, -33.75, -34.375, -35, -35.625, -36.25, -36.875, -37.5, -38.125, -38.75, -39.375, -40, -40.625, -41.25, -41.875, -42.5, -43.125, -43.75, -44.375, -45, -45.625, -46.25, -46.875, -47.5, -48.125, -48.75, -49.375, -50, -50.625, -51.25, -51.875, -52.5, -53.125, -53.75, -54.375, -55, -55.625, -56.25, -56.875, -57.5, -58.125, -58.75, -59.375, -60, -60.625, -61.25, -61.875, -62.5, -63.125, -63.75, -64.375, -65, -65.625, -66.25, -66.875, -67.5, -68.125, -68.75, -69.375, -70, -70.625, -71.25, -71.875, -72.5, -73.125, -73.75, -74.375, -75, -75.625, -76.25, -76.875, -77.5, -78.125, -78.75, -79.375, -80, -80.625, -81.25, -81.875, -82.5, -83.125, -83.75, -84.375, -85, -85.625, -86.25, -86.875, -87.5, -88.125, -88.75, -89.375, -90, -90.625, -91.25, -91.875, -92.5, -93.125, -93.75, -94.375, -95, -95.625, -96.25, -96.875, -97.5, -98.125, -98.75, -99.375];
var colors = [[204, 0, 0], [200, 0, 0], [194, 0, 0], [189, 0, 0], [186, 0, 0], [182, 0, 0], [177, 0, 0], [173, 0, 0], [169, 0, 0], [165, 0, 0], [161, 0, 0], [158, 0, 0], [155, 0, 0], [151, 0, 0], [142, 0, 0], [193, 5, 0], [250, 13, 0], [251, 15, 0], [243, 20, 0], [241, 26, 0], [239, 31, 0], [236, 35, 0], [234, 40, 0], [231, 44, 0], [229, 47, 0], [226, 51, 0], [222, 57, 0], [220, 61, 0], [217, 64, 0], [214, 67, 0], [211, 71, 0], [208, 74, 0], [205, 77, 0], [202, 80, 0], [198, 84, 0], [195, 87, 0], [192, 89, 0], [189, 92, 0], [186, 93, 0], [183, 95, 0], [180, 97, 0], [178, 99, 0], [174, 101, 0], [171, 102, 0], [168, 103, 0], [165, 104, 0], [163, 106, 0], [160, 107, 0], [158, 109, 0], [156, 110, 0], [154, 112, 0], [151, 113, 0], [149, 114, 0], [146, 114, 0], [138, 110, 0], [187, 153, 0], [242, 202, 0], [242, 207, 0], [234, 206, 0], [232, 209, 0], [230, 212, 0], [227, 213, 0], [225, 213, 0], [222, 213, 0], [220, 212, 0], [217, 212, 0], [213, 212, 0], [211, 210, 0], [208, 209, 0], [204, 206, 0], [200, 203, 0], [195, 200, 0], [191, 198, 0], [187, 195, 0], [182, 191, 0], [178, 189, 0], [173, 186, 0], [169, 183, 0], [165, 181, 0], [161, 178, 0], [157, 176, 0], [154, 173, 0], [150, 169, 0], [146, 167, 0], [143, 165, 0], [140, 162, 0], [135, 161, 0], [131, 159, 0], [127, 157, 0], [123, 154, 0], [117, 152, 0], [113, 150, 0], [109, 149, 0], [104, 146, 0], [96, 138, 0], [126, 187, 0], [158, 242, 0], [155, 243, 0], [143, 235, 0], [139, 233, 0], [133, 231, 0], [127, 228, 0], [122, 226, 0], [116, 223, 0], [110, 221, 0], [104, 219, 0], [93, 216, 0], [84, 213, 0], [79, 210, 0], [78, 207, 0], [78, 205, 0], [79, 202, 0], [79, 200, 1], [73, 197, 8], [63, 193, 23], [57, 191, 36], [52, 189, 43], [49, 186, 48], [46, 184, 53], [43, 181, 59], [40, 178, 65], [36, 175, 69], [32, 172, 75], [29, 170, 80], [26, 168, 85], [23, 165, 89], [21, 163, 95], [18, 161, 99], [16, 159, 103], [13, 157, 107], [9, 155, 113], [7, 153, 117], [4, 151, 121], [1, 148, 124], [0, 142, 122], [0, 185, 164], [0, 234, 207], [0, 234, 210], [0, 226, 204], [0, 224, 203], [0, 222, 203], [0, 219, 203], [0, 217, 203], [0, 214, 204], [0, 212, 204], [0, 210, 204], [0, 207, 203], [0, 204, 202], [0, 202, 201], [0, 198, 198], [0, 194, 197], [0, 190, 194], [0, 186, 192], [0, 182, 190], [0, 177, 186], [0, 173, 183], [0, 170, 181], [0, 166, 179], [0, 162, 177], [0, 156, 174], [0, 150, 172], [0, 146, 170], [0, 140, 166], [0, 135, 164], [0, 130, 162], [0, 126, 160], [0, 121, 159], [0, 117, 157], [0, 113, 155], [0, 109, 153], [0, 104, 151], [0, 100, 150], [0, 97, 148], [0, 92, 145], [0, 84, 137], [0, 113, 191], [0, 144, 250], [0, 141, 252], [0, 130, 243], [0, 125, 240], [0, 120, 238], [0, 114, 236], [0, 108, 234], [0, 102, 231], [1, 97, 229], [2, 93, 226], [3, 85, 222], [4, 80, 220], [4, 75, 217], [5, 69, 214], [7, 65, 211], [7, 59, 208], [7, 54, 205], [8, 51, 202], [9, 45, 198], [10, 41, 195], [10, 37, 192], [11, 33, 189], [13, 28, 186], [13, 24, 183], [13, 21, 180], [14, 17, 177], [14, 13, 173], [14, 10, 171], [14, 6, 168], [15, 2, 165], [15, 0, 163], [18, 0, 160], [21, 0, 158], [23, 0, 156], [25, 0, 154], [27, 0, 151], [30, 0, 149], [32, 0, 146], [32, 0, 137], [49, 0, 191], [67, 0, 250], [71, 0, 252], [73, 0, 243], [77, 0, 240], [80, 0, 238], [83, 0, 235], [86, 0, 233], [89, 0, 230], [91, 0, 228], [93, 0, 225], [97, 0, 221], [99, 0, 218], [101, 0, 215], [104, 0, 212], [105, 0, 209], [104, 0, 206], [102, 0, 203], [100, 0, 200], [97, 0, 196], [95, 0, 192], [94, 0, 189], [92, 0, 186], [90, 0, 183], [88, 0, 180], [87, 0, 177], [86, 0, 174], [84, 0, 170], [82, 0, 167], [81, 0, 165], [80, 0, 162], [78, 0, 160], [77, 0, 157], [75, 0, 155], [74, 0, 152], [73, 0, 150], [72, 0, 148], [71, 0, 146], [70, 0, 145], [69, 0, 143]];
/*possible message-messageType: 
    -> start , thermImgData,msaImgData,minTemp,maxTemp
    -> stop
*/
addEventListener('message', function (message) {
    try {
        if (message.data.messageType == "start") {
            running = true;
            finished = false;
            startWorker(message.data.thermImgData, message.data.msaImgData, message.data.minTemp, message.data.maxTemp);
            postMessage({
                messageType: "return",
                finished: finished,
                msaImgData: message.data.msaImgData,
                startX: message.data.startX,
                startY: message.data.startY,
                index: message.data.index
            });
            return;
        }
        if (mesage.data.messageType == "stop") {
            running = false;
            finished = false;
            return;
        }
    } catch (e) {
        postMessage({
            messageType: "error",
            messageError: e.name + " " + e.message + " " + e.stack
        });

    }
    this.close();
});