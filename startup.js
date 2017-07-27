var Imagery;
var files = [];
var loader;
var boxes = [];
var docBo = createElement("div", "mainBox");
var topBar = createElement("div", "topBar");
var defaultShownBox;
const temps = [60, 58.75, 58.125, 57.5, 56.875, 56.25, 55.625, 55, 54.375, 53.75, 53.125, 52.5, 51.875, 51.25, 50.625, 50, 49.375, 48.75, 48.125, 47.5, 46.875, 46.25, 45.625, 45, 44.375, 43.75, 43.125, 42.5, 41.875, 41.25, 40.625, 40, 39.375, 38.75, 38.125, 37.5, 36.875, 36.25, 35.625, 35, 34.375, 33.75, 33.125, 32.5, 31.875, 31.25, 30.625, 30, 29.375, 28.75, 28.125, 27.5, 26.875, 26.25, 25.625, 25, 24.375, 23.75, 23.125, 22.5, 21.875, 21.25, 20.625, 20, 19.375, 18.75, 18.125, 17.5, 16.875, 16.25, 15.625, 15, 14.375, 13.75, 13.125, 12.5, 11.875, 11.25, 10.625, 10, 9.375, 8.75, 8.125, 7.5, 6.875, 6.25, 5.625, 5, 4.375, 3.75, 3.125, 2.5, 1.875, 1.25, 0.625, 0, -0.625, -1.25, -1.875, -2.5, -3.125, -3.75, -4.375, -5, -5.625, -6.25, -6.875, -7.5, -8.125, -8.75, -9.375, -10, -10.625, -11.25, -11.875, -12.5, -13.125, -13.75, -14.375, -15, -15.625, -16.25, -16.875, -17.5, -18.125, -18.75, -19.375, -20, -20.625, -21.25, -21.875, -22.5, -23.125, -23.75, -24.375, -25, -25.625, -26.25, -26.875, -27.5, -28.125, -28.75, -29.375, -30, -30.625, -31.25, -31.875, -32.5, -33.125, -33.75, -34.375, -35, -35.625, -36.25, -36.875, -37.5, -38.125, -38.75, -39.375, -40, -40.625, -41.25, -41.875, -42.5, -43.125, -43.75, -44.375, -45, -45.625, -46.25, -46.875, -47.5, -48.125, -48.75, -49.375, -50, -50.625, -51.25, -51.875, -52.5, -53.125, -53.75, -54.375, -55, -55.625, -56.25, -56.875, -57.5, -58.125, -58.75, -59.375, -60, -60.625, -61.25, -61.875, -62.5, -63.125, -63.75, -64.375, -65, -65.625, -66.25, -66.875, -67.5, -68.125, -68.75, -69.375, -70, -70.625, -71.25, -71.875, -72.5, -73.125, -73.75, -74.375, -75, -75.625, -76.25, -76.875, -77.5, -78.125, -78.75, -79.375, -80, -80.625, -81.25, -81.875, -82.5, -83.125, -83.75, -84.375, -85, -85.625, -86.25, -86.875, -87.5, -88.125, -88.75, -89.375, -90, -90.625, -91.25, -91.875, -92.5, -93.125, -93.75, -94.375, -95, -95.625, -96.25, -96.875, -97.5, -98.125, -98.75, -99.375];
const colors = [[204, 0, 0], [200, 0, 0], [194, 0, 0], [189, 0, 0], [186, 0, 0], [182, 0, 0], [177, 0, 0], [173, 0, 0], [169, 0, 0], [165, 0, 0], [161, 0, 0], [158, 0, 0], [155, 0, 0], [151, 0, 0], [142, 0, 0], [193, 5, 0], [250, 13, 0], [251, 15, 0], [243, 20, 0], [241, 26, 0], [239, 31, 0], [236, 35, 0], [234, 40, 0], [231, 44, 0], [229, 47, 0], [226, 51, 0], [222, 57, 0], [220, 61, 0], [217, 64, 0], [214, 67, 0], [211, 71, 0], [208, 74, 0], [205, 77, 0], [202, 80, 0], [198, 84, 0], [195, 87, 0], [192, 89, 0], [189, 92, 0], [186, 93, 0], [183, 95, 0], [180, 97, 0], [178, 99, 0], [174, 101, 0], [171, 102, 0], [168, 103, 0], [165, 104, 0], [163, 106, 0], [160, 107, 0], [158, 109, 0], [156, 110, 0], [154, 112, 0], [151, 113, 0], [149, 114, 0], [146, 114, 0], [138, 110, 0], [187, 153, 0], [242, 202, 0], [242, 207, 0], [234, 206, 0], [232, 209, 0], [230, 212, 0], [227, 213, 0], [225, 213, 0], [222, 213, 0], [220, 212, 0], [217, 212, 0], [213, 212, 0], [211, 210, 0], [208, 209, 0], [204, 206, 0], [200, 203, 0], [195, 200, 0], [191, 198, 0], [187, 195, 0], [182, 191, 0], [178, 189, 0], [173, 186, 0], [169, 183, 0], [165, 181, 0], [161, 178, 0], [157, 176, 0], [154, 173, 0], [150, 169, 0], [146, 167, 0], [143, 165, 0], [140, 162, 0], [135, 161, 0], [131, 159, 0], [127, 157, 0], [123, 154, 0], [117, 152, 0], [113, 150, 0], [109, 149, 0], [104, 146, 0], [96, 138, 0], [126, 187, 0], [158, 242, 0], [155, 243, 0], [143, 235, 0], [139, 233, 0], [133, 231, 0], [127, 228, 0], [122, 226, 0], [116, 223, 0], [110, 221, 0], [104, 219, 0], [93, 216, 0], [84, 213, 0], [79, 210, 0], [78, 207, 0], [78, 205, 0], [79, 202, 0], [79, 200, 1], [73, 197, 8], [63, 193, 23], [57, 191, 36], [52, 189, 43], [49, 186, 48], [46, 184, 53], [43, 181, 59], [40, 178, 65], [36, 175, 69], [32, 172, 75], [29, 170, 80], [26, 168, 85], [23, 165, 89], [21, 163, 95], [18, 161, 99], [16, 159, 103], [13, 157, 107], [9, 155, 113], [7, 153, 117], [4, 151, 121], [1, 148, 124], [0, 142, 122], [0, 185, 164], [0, 234, 207], [0, 234, 210], [0, 226, 204], [0, 224, 203], [0, 222, 203], [0, 219, 203], [0, 217, 203], [0, 214, 204], [0, 212, 204], [0, 210, 204], [0, 207, 203], [0, 204, 202], [0, 202, 201], [0, 198, 198], [0, 194, 197], [0, 190, 194], [0, 186, 192], [0, 182, 190], [0, 177, 186], [0, 173, 183], [0, 170, 181], [0, 166, 179], [0, 162, 177], [0, 156, 174], [0, 150, 172], [0, 146, 170], [0, 140, 166], [0, 135, 164], [0, 130, 162], [0, 126, 160], [0, 121, 159], [0, 117, 157], [0, 113, 155], [0, 109, 153], [0, 104, 151], [0, 100, 150], [0, 97, 148], [0, 92, 145], [0, 84, 137], [0, 113, 191], [0, 144, 250], [0, 141, 252], [0, 130, 243], [0, 125, 240], [0, 120, 238], [0, 114, 236], [0, 108, 234], [0, 102, 231], [1, 97, 229], [2, 93, 226], [3, 85, 222], [4, 80, 220], [4, 75, 217], [5, 69, 214], [7, 65, 211], [7, 59, 208], [7, 54, 205], [8, 51, 202], [9, 45, 198], [10, 41, 195], [10, 37, 192], [11, 33, 189], [13, 28, 186], [13, 24, 183], [13, 21, 180], [14, 17, 177], [14, 13, 173], [14, 10, 171], [14, 6, 168], [15, 2, 165], [15, 0, 163], [18, 0, 160], [21, 0, 158], [23, 0, 156], [25, 0, 154], [27, 0, 151], [30, 0, 149], [32, 0, 146], [32, 0, 137], [49, 0, 191], [67, 0, 250], [71, 0, 252], [73, 0, 243], [77, 0, 240], [80, 0, 238], [83, 0, 235], [86, 0, 233], [89, 0, 230], [91, 0, 228], [93, 0, 225], [97, 0, 221], [99, 0, 218], [101, 0, 215], [104, 0, 212], [105, 0, 209], [104, 0, 206], [102, 0, 203], [100, 0, 200], [97, 0, 196], [95, 0, 192], [94, 0, 189], [92, 0, 186], [90, 0, 183], [88, 0, 180], [87, 0, 177], [86, 0, 174], [84, 0, 170], [82, 0, 167], [81, 0, 165], [80, 0, 162], [78, 0, 160], [77, 0, 157], [75, 0, 155], [74, 0, 152], [73, 0, 150], [72, 0, 148], [71, 0, 146], [70, 0, 145], [69, 0, 143]];
const gdriveRestURL = "https://www.googleapis.com/drive/v3/files/";
const gdriveFileURL = "https://docs.google.com/uc?id=";
let gdriveApiKeys = [
    { key: "AIzaSyDcPAYckM8eq3NkntNijLzq_pI2p-n_-SA", folder: "0B-HW4voEJgOgamFpanhnVlVwRzA" },
    { key: "AIzaSyCaC82KAUysQ2FBgAo_Ks1kEg43SKv-3uE", folder: "0B3v6z-kU8mPpYVVoczI2NEhfMnM" }];

createEventHandler('onLoadStart', document);
createEventHandler('onLogLoad', document);
createEventHandler('onAPIKeyLoaded', document);
createEventHandler('onFilesLoaded', document);
createEventHandler('onDataProcessed', document);
document.onLoadStart.addEventListener(() => {
    Promise.all(gdriveApiKeys.map((x) => {
        getFileListPromised(x.key, x.folder);
    })).then(y => console.log(y)).catch(y => console.log(y));
});
Array.prototype.pushIfNotExist = function (element) {
    if (this.indexOf(element) == -1) {
        this.push(element);
    }
};
String.prototype.padLeft = function (n, chr) {
    var res = this;
    while (n > res.length) {
        res = chr + res;
    }
    return res;
}
function createEventHandler(name, element) {
    return element[name] = {
        functions: [],
        addEventListener: function (call) { this.functions.push(call); },
        dispatchEvent: function (event) {
            for (var handler of this.functions) { handler(event); }
        }
    };
}
function getBase64ContentPromised(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () { resolve(reader.result); }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    });
}
function createCanvasImgCont(parent) {
    var canv = document.createElement("canvas");
    var cont = canv.getContext("2d");
    var img = document.createElement("img");
    img.style.display = "none";
    parent.appendChild(img);
    canv.img = img;
    canv.cont = cont;
    return { canv: canv, cont: cont, img: img };
}
//resolves [canvas, content, image]
function loadImageToCanvasPromised(imgId, canv, cont, img, APIKey) {
    return new Promise((resolve, reject) => {
        getBase64ContentPromised(gdriveRestURL + imgId + "?alt=media&key=" + APIKey).then((x) => {
            img.onload = function () {
                console.log("drawing: " + x.length);
                canv.width = img.naturalWidth;
                canv.height = img.naturalHeight;
                cont.drawImage(img, 0, 0, img.width, img.height);
            };
            img.src = x;
            resolve(
                {
                    Canvas: canv,
                    Context: cont,
                    Image: img,
                    APIKey: APIKey
                }
            );
        });
    });
};
function rgbH(r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16);
}
function getTemp(color) {
    let oIdx = 0;
    let i = 0;
    for (; i < colors.length; i++) {
        if (colorComparision(color, colors[i]) < colorComparision(color, colors[oIdx])) oIdx = i;
    }
    return temps[oIdx];
}
function colorComparision(color1, color2) {
    return (Math.abs(color1[0] - color2[0]) * Math.abs(color1[0] - color2[0]) +
        Math.abs(color1[1] - color2[1]) * Math.abs(color1[1] - color2[1]) +
        Math.abs(color1[2] - color2[2]) * Math.abs(color1[2] - color2[2])) / (3 * 255 * 255);
}
function httpGetPromised(theUrl) {
    return new Promise((resolve, reject) => {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                resolve(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    });
}
function createQuery(pageTokenValue, apiKey, folderId) {
    //console.log(arguments);
    //console.log("folder:" + folderId);
    if (pageTokenValue == undefined) { pageTokenValue = ""; }
    var query = {
        baseURL: "https://www.googleapis.com/drive/v3/files?",
        parameters: {
            pageSize: 1000,
            q: "%27" + folderId + "%27+in+parents",
            key: apiKey,
            pageToken: pageTokenValue
        }

    };
    query.getURL = function () {
        let queryStr = "";
        for (let z in this.parameters) {
            queryStr += "&" + z + "=" + this.parameters[z];
        }
        queryStr = gdriveRestURL + "?" + queryStr.substring(1);
        //console.log(queryStr);
        return queryStr;
    }
    return query.getURL();
}
function getFileListPromised(apiKey, folderId, jsonSTR) {
    let nextPageToken = "";
    if (jsonSTR) {
        var doc = JSON.parse(jsonSTR);
        nextPageToken = doc.nextPageToken;
        for (var z of doc.files) {
            if (z === undefined) { continue; }
            z.APIKey = apiKey;
            files.push(z);
        }
        if (!nextPageToken) {
            console.log(files.length + " files loaded");
            document.onAPIKeyLoaded.dispatchEvent(apiKey);
            return;
        }
    }
    //console.log(createQuery(nextPageToken, apiKey, folderId));
    return httpGetPromised(createQuery(nextPageToken, apiKey, folderId)).then((x) => getFileListPromised(apiKey, folderId, x));
}
//var superList = [];
function createRangeArray(start, end) {
    return new Array(end - start).fill(0).map((_, k) => k + start);
}
function processData() {
    Imagery = {
        Dates: [],
        ImageModes: [],
        Satellites: [],
        Data: {},
        ImagesCount: 0,
        LogFileId: "",
        DateToString: (dat) => {
            return dat.getUTCFullYear().toString().padLeft(4, "0")
                + (dat.getUTCMonth() + 1).toString().padLeft(2, "0")
                + dat.getUTCDate().toString().padLeft(2, "0")
                + dat.getUTCHours().toString().padLeft(2, "0")
                + dat.getUTCMinutes().toString().padLeft(2, "0");
        }
    };

    //for (let i = 0; i < files.length; i++) {
    for (let file of files) {
        if (file == undefined) { continue; }
        //     superList.push({ name: file.name, list: gdriveFileURL + file.id });
        let name = file.name;
        if (name.endsWith(".log")) {
            Imagery.LogFileId = file.id;
            document.onLogLoad.dispatchEvent();
            continue;
        }
        let id = file.id;
        let sat = parseInt(name.substring(5, 7));
        let mode = name.substring(21, name.length - 4);
        let dat = new Date(name.substring(8, 12) + "/" +
            name.substring(12, 14) + "/" +
            name.substring(14, 16) + "/" +
            name.substring(16, 18) + ":" +
            name.substring(18, 20));
        if (dat == undefined || mode == undefined || sat == undefined || isNaN(sat) || isNaN(dat)) { console.log(file); console.log({ dat: dat, nam: name, id: id, mode: mode }); continue; }
        Imagery.ImageModes.pushIfNotExist(mode);
        Imagery.Satellites.pushIfNotExist(sat);
        if (Imagery.Data[dat] == undefined) {
            Imagery.Dates.push(dat);
            Imagery.Data[dat] = {
                Sat: sat,
                ModeIds: [Imagery.ImageModes.indexOf(mode)],
                IDs: {},
                APIKey: file.APIKey
            };
            Imagery.Data[dat].IDs[Imagery.ImageModes.indexOf(mode)] = id;
        }
        else {
            if (Imagery.Data[dat].ModeIds.indexOf(Imagery.ImageModes.indexOf(mode)) > -1 && file.APIKey == Imagery.Data[dat].APIKey) {
                continue;
            }
            Imagery.Data[dat].ModeIds.push(Imagery.ImageModes.indexOf(mode));
            Imagery.Data[dat].IDs[Imagery.ImageModes.indexOf(mode)] = id;
        }
        Imagery.ImagesCount++;
    }
    addFunctionsToImagery();
    document.onDataProcessed.dispatchEvent();
}
function addFunctionsToImagery() {
    class DateUtility {
        GetLastDayOfMonth(year, month) {
            let date = new Date();
            date.setUTCMonth(month);
            date.setUTCFullYear(year);
            date.setUTCDate(0);
            return date;//.getUTCDate();
        }
        GetDaysOfMonth(year, month) {
            console.log("GetdaysofMonth", year, month);
            return createRangeArray(1, this.GetLastDayOfMonth(year, month).getUTCDate());
        }
        GetWeeksOfMonth(year, month) {
            let date = this.GetLastDayOfMonth(year, month);
            let previousWeek = 0;
            let weeks = [];
            let recentWeek = [];
            for (let z = 1; z < date.getUTCDay(); z++) {
                recentWeek.push(undefined);
            }
            while (date.getUTCMonth() == month) {
                if (date.getUTCDay() == 1 && recentWeek.length > 0) {
                    weeks.push(recentWeek);
                    recentWeek = [];
                }
                previousDayOfWeek = date.getUTCDay();
                recentWeek.push(new Date(date));
                date.setUTCDate(date.getUTCDate() + 1);
            }
            weeks.push(recentWeek);
            return weeks;
        }
        GetDateFromHumanNotation(year, month, day) {
            if (day == undefined) { day = 1; }
            if (month == undefined) { month = 1; }
            let date = new Date();
            date.setUTCFullYear(year);
            date.setUTCMonth(month - 1);
            date.setUTCDate(day);
            return date;
        }
    }
    Imagery.DateUtility = new DateUtility();

    Imagery.Dates.sort((x, y) => {
        return y.valueOf() > x.valueOf();
    });
    Imagery.GetNewestDate = function (year, month, day) {
        if (day == undefined && month == undefined && year == undefined) {
            return this.Dates[0];
        }
        let compDate = Imagery.DateUtility.GetDateFromHumanNotation(year, month, day);
        compDate.setUTCHours(23);
        compDate.setUTCMinutes(59);
        compDate.setUTCSeconds(59);
        return new Date(Math.min(...this.Dates.filter(x =>
            x > compDate)));
    };
    Imagery.GetOldestDate = function (year, month, day) {
        if (day == undefined && month == undefined && year == undefined) {
            return this.Dates[0];
        }
        let compDate = Imagery.DateUtility.GetDateFromHumanNotation(year, month, day);
        compDate.setUTCHours(0);
        compDate.setUTCMinutes(0);
        compDate.setUTCSeconds(0);
        return new Date(Math.max(...this.Dates.filter(x =>
            x < compDate)));

    }
    Imagery.GetAllImageLinks = () => {
        var ls = [];
        Imagery.Dates.forEach(x => {
            for (var z in Imagery.Data[Imagery.Dates[0]].IDs) { ls.push(Imagery.GetImageLinkFromId(Imagery.Data[Imagery.Dates[0]].IDs[z])); }
        });
        return ls;
    };
    Imagery.GetImageLinkFromId = (id) => { return gdriveFileURL + id; };
    Imagery.GetImageLinkFromExactDate = function (dat, modeStr) { return gdriveFileURL + this.Data[dat].IDs[this.ImageModes.indexOf(modeStr)]; };
    Imagery.GetImageLinksFromDay = function (year, month, day) { return this.Dates.filter(x => x.getUTCFullYear() == year && (x.getUTCMonth() + 1) == month && (x.getUTCDate() == day)).map(x => { return this.GetImageLinkFromId(x); }); };
    Imagery.GetDataFromDay = function (year, month, day) {
        return this.Dates.filter(x => x.getUTCFullYear() == year && (x.getUTCMonth() + 1) == month && (x.getUTCDate() == day)).map(x => Imagery.Data[x]);
    };
    Imagery.getUTCDatesFromDay = function (year, month, day) { return this.Dates.filter(x => x.getUTCFullYear() == year && (x.getUTCMonth() + 1) == month && (x.getUTCDate() == day)); };
    Imagery.getUTCDatesFromMonth = function (year, month) { return this.Dates.filter(x => x.getUTCFullYear() == year && (x.getUTCMonth() + 1) == month); };

    Imagery.GetModeIndexFromString = function (modeStr) { return this.ImageModes.indexOf(modeStr); };
    Imagery.GetImagesFromMode = function (modeStr) { return; }// this.Data.filter(x => x.ModeIds.contains(this.ImageModes.indexOf(modeStr))) };
    Imagery.GetYears = function () {
        return findUniqueELements(this.Dates.map(x => x.getUTCFullYear())).sort((x, y) => x < y);
    };
    Imagery.getUTCMonths = function (year) {
        return findUniqueELements(this.Dates.filter(x => x.getUTCFullYear() == year).map(x => x.getUTCMonth()));
    }
    Imagery.GetDays = function (year, month) {
        return findUniqueELements(this.Dates.filter(x => x.getUTCFullYear() == year && x.getUTCMonth() == month).map(x => x.getUTCDate()));
    };
}
function createMainPageEvents() {
    document.onLoadStart.addEventListener(createLoaderUI);
    document.onAPIKeyLoaded.addEventListener((APIKey) => {
        console.log("APIKEYLOADED" + JSON.stringify(gdriveApiKeys));
        gdriveApiKeys.find(x => x.key == APIKey).loaded = true;
        if (gdriveApiKeys.every((x) => x.loaded) == true) {
            console.log("ALLAPIKEYLOADED");
            document.onFilesLoaded.dispatchEvent();
        }
    });
    document.onFilesLoaded.addEventListener(processData);
    document.onDataProcessed.addEventListener(createMainUI);
    document.onDataProcessed.addEventListener(createStartBox);
    document.onDataProcessed.addEventListener(createThermalTemperatureView);
    document.onDataProcessed.addEventListener(createSearchGUI);
}
function findUniqueELements(array) {
    return array.filter(function (itm, i, a) {
        return i == a.indexOf(itm);
    });
}
function createLogBox(logContent) {
    var firstBox = createElement("div", "box");
    firstBox.innerHTML = logContent;
    createTopBarIndex("Upload log", firstBox);
}
function createMainUI() {
    if (loader != undefined && loader.style != undefined) {
        loader.style.animation = "1s cubic-bezier(0.47, 0, 0.74, 0.71) normal none 1 running dialog_up";
    }
    setTimeout(function () {
        if (loader != undefined) { loader.remove(); }
        topBar.style.animation = "topBar_moveRight 1s ease-out 1";

        document.parent.appendChild(topBar);
        document.parent.appendChild(docBo);
    }, 1000);
}
function createSearchGUI() {
    var box = createElement("div", "box");
    var queryForm = createElement("div", "inputWrapper");
    createTopBarIndex("Search", box);
    var dropDownListOperator = createDropDownList(["LIST", "SHOW"], true);
    var dropDownListModes = createDropDownList(Imagery.ImageModes.filter(x => x), false);
    var lb = createElement("div", "inputDescription");
    queryForm.appendChild(lb);
    lb.innerHTML = "Search operator:";
    queryForm.appendChild(dropDownListOperator);
    lb = createElement("div", "inputDescription");
    lb.innerHTML = "Image Modes:";
    queryForm.appendChild(lb);
    queryForm.appendChild(dropDownListModes);
    lb = createElement("div", "inputDescription");
    lb.innerHTML = "Start date:";
    queryForm.appendChild(lb);
    var startDateInput = createDatePicker(new Date());
    startDateInput.onblur = function () {
        var stDate = new Date(this.value);
        if (isNaN(stDate)) {
            this.classList.add("invalidInput");
        }
        else {
            this.classList.remove("invalidInput");
        }
    };
    queryForm.appendChild(startDateInput);
    lb = createElement("div", "inputDescription");
    lb.innerHTML = "End date:";
    queryForm.appendChild(lb);
    var endDateInput = createDatePicker(new Date());

    endDateInput.onblur = function () {
        var endDate = new Date(this.value);
        if (isNaN(endDate)) {
            this.classList.add("invalidInput");
        }
        else {
            this.classList.remove("invalidInput");
        }
    };
    queryForm.appendChild(endDateInput);

    box.appendChild(queryForm);
    /*Input's
     * -> LIST or SHOW
     * -> ImageModes done
     * -> Start Date
     * -> End Date
     * -> Satellite
     * */
}
function createElement(tag, className) {
    var el = document.createElement(tag);
    el.className = className;
    return el;
}
function createDropDownList(inputStuff, radioButton) {
    if (document.hideDialogs == undefined) {
        createEventHandler("hideDialogs", document);
        document.addEventListener("click", function (ev) {
            document.hideDialogs.dispatchEvent(ev);
        });
    }
    var elemWrapper = createElement("div", "elementWrapper");
    elemWrapper.Values = [];
    var shownInput = createElement("input", "shownInputBox");
    var checkBoxWrapper = createElement("div", "checkboxWrapper");
    checkBoxWrapper.classList.add("hidden");
    shownInput.onclick = function (ev) {
        ev.stopImmediatePropagation();
        shownInput.value = elemWrapper.Values.map(function (x) {
            return (document.getElementById(x.CheckBox).checked) ? x.Value : "";
        }).filter(n => n
            ).join();
        document.hideDialogs.dispatchEvent(ev);
        if (checkBoxWrapper.classList.contains("hidden")) {
            checkBoxWrapper.classList.remove("hidden");
            return;
        }
    };
    document.hideDialogs.addEventListener(function () {
        if (!checkBoxWrapper.classList.contains("hidden")) {
            checkBoxWrapper.classList.add("hidden");
            return;
        }
    });

    var closeButton = createElement("input", "button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("value", "Close");
    closeButton.onclick = function () {
        shownInput.click();
    };
    var randName = Math.random().toString(36).substring(7);
    for (var k of inputStuff) {

        let id = Math.random().toString(36).substring(7);
        var checkBox = createElement("input", "checkBox");
        checkBox.setAttribute("type", (radioButton) ? "radio" : "checkbox");
        checkBox.setAttribute("name", randName);
        checkBox.setAttribute("id", id);

        let p = document.createElement("p");
        let label = createElement("label", "checkBoxLabel");
        label.ValueIndex = checkBox.ValueIndex = -1 + elemWrapper.Values.push(
            {
                Value: k,
                CheckBox: checkBox.id
            });
        label.appendChild(checkBox);
        if (radioButton) {
            checkBox.parentElement.onclick = function (ev) {
                ev.stopImmediatePropagation();
                var radios = document.getElementsByName(this.getAttribute("name"));
                for (var z of radios) {
                    if (this != z) {
                        z.checked = false;
                    }
                }
                this.checked = true;

            };
        }

        label.setAttribute("for", id);
        label.innerHTML += k;
        label.CheckBox = checkBox;
        label.setAttribute("title", k);
        checkBoxWrapper.appendChild(label);
    }
    checkBoxWrapper.appendChild(closeButton);
    elemWrapper.appendChild(shownInput);
    elemWrapper.appendChild(checkBoxWrapper);
    return elemWrapper;
}
function createDatePicker(initialDate) {
    if (document.hideDialogs == undefined) {
        createEventHandler("hideDialogs", document);
        document.addEventListener("click", function (ev) {
            document.hideDialogs.dispatchEvent(ev);
        });
    }
    var datePickerWrapperBox = createElement("div", "datePickerWrapperBox noselect");

    var datePickerInput = createElement("input", "datePickerInput");
    var datePickerBox = createElement("div", "datePickerBox noselect");
    var datePickerYearRow = createElement("div", "datePickerYearRow centerFlexBox noselect");
    var datePickerYearDec = createElement("div", "datePickerYearButton noselect");
    var datePickerYearInc = createElement("div", "datePickerYearButton noselect ");
    var datePickerYearDecDisplay = createElement("div", "datePickerYearButtonDisplay centerFlexBox noselect");
    var datePickerYearIncDisplay = createElement("div", "datePickerYearButtonDisplay centerFlexBox noselect");
    var datePickerYearDisplay = createElement("div", "datePickerYearDisplay centerFlexBox noselect");

    var datePickerMonthBox = createElement("div", "datePickerMonthBox noselect");
    var datePickerMonthDisplay = createElement("div", "datePickerMonthDisplay centerFlexBox noselect");
    var datePickerMonthRow = createElement("div", "datePickerMonthRow noselect");
    var datePickerMonthDec = createElement("div", "datePickerMonthButton noselect");
    var datePickerMonthInc = createElement("div", "datePickerMonthButton noselect");

    var datePickerMonthDecDisplay = createElement("div", "datePickerMonthButtonDisplay centerFlexBox noselect");
    var datePickerMonthIncDisplay = createElement("div", "datePickerMonthButtonDisplay centerFlexBox noselect");

    datePickerMonthInc.appendChild(datePickerMonthIncDisplay);
    datePickerMonthDec.appendChild(datePickerMonthDecDisplay);

    datePickerMonthDecDisplay.innerHTML = "⟨";//"&#x2039;";// ›
    datePickerMonthIncDisplay.innerHTML = "⟩"//"&#x203A;";
    datePickerYearIncDisplay.innerHTML = "⟩";//"&#x203A;";
    datePickerYearDecDisplay.innerHTML = "⟨";//"&#x2039;";
    datePickerYearInc.appendChild(datePickerYearIncDisplay);
    datePickerYearDec.appendChild(datePickerYearDecDisplay);
    datePickerYearRow.appendChild(datePickerYearDec);
    datePickerYearRow.appendChild(datePickerYearDisplay);
    datePickerYearRow.appendChild(datePickerYearInc);
    datePickerBox.appendChild(datePickerYearRow);

    datePickerMonthRow.appendChild(datePickerMonthDec);
    datePickerBox.appendChild(datePickerMonthDisplay);
    datePickerMonthRow.appendChild(datePickerMonthBox);
    datePickerMonthRow.appendChild(datePickerMonthInc);
    datePickerBox.appendChild(datePickerMonthRow);
    datePickerInput.isVisible = true;
    datePickerInput.datePickerBox = datePickerBox;
    datePickerInput.hidePicker = function () {
        this.datePickerBox.style.visibility = "hidden";
        this.datePickerBox.style.display = "none";
        this.isVisible = false;
    };
    datePickerInput.showPicker = function () {
        this.datePickerBox.style.visibility = "visible";
        this.datePickerBox.style.display = "unset";
        this.isVisible = true;
    };
    datePickerInput.togglePicker = function () {
        if (this.isVisible) { this.hidePicker(); }
        else { this.showPicker(); }
    };

    datePickerYearInc.addEventListener("click", function (e) {
        datePickerInput.Date.setUTCFullYear(datePickerInput.Date.getUTCFullYear() + 1);
        datePickerInput.update();
        e.stopImmediatePropagation();
    }, true);
    datePickerYearDec.addEventListener("click", function (e) {
        datePickerInput.Date.setUTCFullYear(datePickerInput.Date.getUTCFullYear() - 1);
        datePickerInput.update();
        e.stopImmediatePropagation();
    }, true);
    datePickerMonthInc.addEventListener("click", function (e) {
        datePickerInput.Date.setUTCMonth(datePickerInput.Date.getUTCMonth() + 1);
        datePickerInput.update();
        e.stopImmediatePropagation();
    }, true);
    datePickerMonthDec.addEventListener("click", function (e) {
        datePickerInput.Date.setUTCMonth(datePickerInput.Date.getUTCMonth() - 1);
        datePickerInput.update();
        e.stopImmediatePropagation();
    }, true);
    document.hideDialogs.addEventListener(
        function () {
            if (datePickerInput != undefined && datePickerInput.isVisible) {
                datePickerInput.hidePicker();
            }
        });
    datePickerInput.addEventListener("click",
        function (e) {
            document.hideDialogs.dispatchEvent(e);
            this.togglePicker();
            e.stopImmediatePropagation();
        }, true);

    datePickerWrapperBox.addEventListener("click", function (e) {
        e.stopImmediatePropagation();
    }, false);
    if (initialDate == undefined) {
        initialDate = new Date();
    }
    datePickerInput.Date = initialDate;
    datePickerInput.MonthDisplay = datePickerMonthDisplay;
    datePickerInput.YearDisplay = datePickerYearDisplay;
    datePickerInput.update = function () {
        this.MonthDisplay.innerHTML = this.Date.toLocaleString(navigator.language || navigator.userLanguage, { month: "long" })
        this.YearDisplay.innerHTML = this.Date.getUTCFullYear();
        var dayBoxes = Array.prototype.slice.call(datePickerMonthBox.getElementsByClassName("datePickerDayBox"), []);// Array.slice(datePickerMonthBox.getElementsByClassName("datePickerDayBox"), []);
        var weeks = Imagery.DateUtility.GetWeeksOfMonth(datePickerInput.Date.getUTCFullYear(), datePickerInput.Date.getUTCMonth());
        for (let i = 0; i < 6; i++) {
            for (let ii = 0; ii < 7; ii++) {
                var datePickerInputDayBox = dayBoxes.find(x => { return x.columnIdx == i && x.rowIdx == ii; });
                datePickerMonthBox.appendChild(datePickerInputDayBox);
                if (weeks.length > i && weeks[i].length > ii && weeks[i][ii] != undefined) {
                    datePickerInputDayBox.innerHTML = weeks[i][ii].getUTCDate();
                }
                else {
                    datePickerInputDayBox.innerHTML = "";
                }
            }
        }
        datePickerInput.value = datePickerInput.Date.getUTCDate() + "." + datePickerInput.Date.getUTCMonth() + "." + datePickerInput.Date.getUTCFullYear();
    };
    datePickerInput.DayBoxes = [];

    let weeks = Imagery.DateUtility.GetWeeksOfMonth(initialDate.getUTCFullYear(), initialDate.getUTCMonth());
    for (var i = 0; i < 6; i++) {
        for (var ii = 0; ii < 7; ii++) {
            var datePickerInputDayBox = createElement("div", "datePickerDayBox centerFlexBox noselect");
            datePickerInputDayBox.rowIdx = ii;
            datePickerInputDayBox.columnIdx = i;
            datePickerMonthBox.appendChild(datePickerInputDayBox);
            datePickerInputDayBox.addEventListener("click", function (e) {
                datePickerInput.Date.setUTCDate(this.innerHTML);
                datePickerInput.update();
                datePickerInput.hidePicker();
                e.stopImmediatePropagation();
            }, true);
        }
    }

    datePickerInput.update();
    datePickerWrapperBox.appendChild(datePickerBox);
    datePickerWrapperBox.appendChild(datePickerInput);
    return datePickerWrapperBox;
}
function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
function createThermalTemperatureView() {
    var box = createElement("div", "box");
    var queryForm = createElement("div", "inputWrapper fixedInputWrapper");
    createTopBarIndex("Thermal Analysis", box);
    var label = document.createElement("label");
    var outputTemp = createElement("div", "inputDescription");
    var inputDateLabel = createElement("div", "inputDescription");
    inputDateLabel.innerHTML = "Select Date:";
    queryForm.appendChild(inputDateLabel);
    var sel = document.createElement("select");
    for (var k of Imagery.Dates) {
        var option = document.createElement("option");
        option.innerHTML = k.toLocaleDateString() + " " + k.toLocaleTimeString();
        option.date = k;
        sel.appendChild(option);
    }
    label.appendChild(sel);
    queryForm.appendChild(label);
    queryForm.appendChild(outputTemp);
    box.appendChild(queryForm);
    box.DrawObjects = createCanvasImgCont(box);
    sel.onchange = function (x) {
        loadImageToCanvasPromised(
            Imagery.Data[x.explicitOriginalTarget.date].IDs[Imagery.ImageModes.indexOf("therm")],
            box.DrawObjects.canv,
            box.DrawObjects.cont,
            box.DrawObjects.img,
            Imagery.Data[x.explicitOriginalTarget.date].APIKey
        ).then((stuff) => {
            console.log("loaded");
            box.appendChild(stuff.Canvas);
            stuff.Canvas.onmousemove = function (mouseEvent) {
                if (!checkVisible(stuff.Canvas)) { return; }
                var offset = stuff.Canvas.getBoundingClientRect();
                var point = { x: mouseEvent.clientX - offset.left, y: mouseEvent.clientY - offset.top };
                var rgbv = stuff.Context.getImageData(point.x, point.y, 1, 1);
                outputTemp.innerHTML = "Temperature:\t" + getTemp((rgbv.data)) + "°C";
            };
        });
    };
    sel.onchange({ explicitOriginalTarget: sel.options[0] });
}
function saveImageryState() {
    var typedArray = JSON.stringify(Imagery);
    var blob = new Blob([typedArray], { type: 'application/json' });//application/octet-binary' }); // pass a useful mime type here
    var url = URL.createObjectURL(blob);
    window.open(url);
}
function createStartBox() {

    var firstBox = createElement("div", "box");
    var mainCBox = createElement("div", "contentBox");
    var scrollBox = createElement("div", "scrollbox");
    mainCBox.appendChild(scrollBox);

    var preferedModes = Imagery.ImageModes.map(x => {
        return {
            ModeName: x,
            Selected: (x == "therm" || x == "msa"),
            ModeIdx: Imagery.ImageModes.indexOf(x)
        }
    });
    preferedModes.Buttons = [];
    createEventHandler("OnPreferedModesChanged", preferedModes);
    //["therm", "msa"];
    defaultShownBox = firstBox;
    createTopBarIndex("Latest Images", firstBox);
    var secondTopBar = createElement("div", "secondTopBar");
    for (var z of preferedModes) {
        let el = createElement("div", "item");
        el.innerText = z.ModeName;
        el.Value = z;
        el.update = function () {
            if (this.Value.Selected) {
                this.classList.add("selected");
            }
            else {
                this.classList.remove("selected");
            }
        };
        el.onclick = function () {
            el.Value.Selected = !el.Value.Selected;
            console.log(el.Value);
            this.update();
        }
        secondTopBar.appendChild(el);

    }
    firstBox.appendChild(secondTopBar);
    firstBox.appendChild(mainCBox);

    var sideBar = createElement("div", "sideBar");
    document.sideBar = sideBar;
    sideBar.Date = Imagery.GetNewestDate();
    sideBar.updatesideBar = function (date) {
        var sideBarDate = date;
        let years = Imagery.GetYears().map(x => {
            return {
                value: x,
                exists: true,
                visible: true,
                current: sideBarDate.getUTCFullYear() == x,
                date: Imagery.GetNewestDate(x, 1, 1)
            }
        });
        let usedMonths = Imagery.getUTCMonths(sideBarDate.getUTCFullYear());
        let months = createRangeArray(0, 12).map(x => {
            return {
                value: x + 1,
                current: x == sideBarDate.getUTCMonth(),
                exists: usedMonths.indexOf(x) > -1,
                visible: true,
                date: Imagery.GetOldestDate(sideBarDate.getUTCFullYear(), x + 2, 1)
            }
        });
        let usedDays = Imagery.GetDays(sideBarDate.getUTCFullYear(), sideBarDate.getUTCMonth());
        let days = createRangeArray(1, 32).map(x => {
            return {
                value: x,
                current: x == sideBarDate.getUTCDate(),
                exists: usedDays.indexOf(x) > -1,
                visible: Imagery.DateUtility.GetLastDayOfMonth(sideBarDate.getUTCFullYear(), 1 + sideBarDate.getUTCMonth()) > x,
                date: Imagery.DateUtility.GetDateFromHumanNotation(sideBarDate.getUTCFullYear(), 1 + sideBarDate.getUTCMonth(), x)
            }
        });

        var createDateBar = (values, name, parent, wrapperClass, entryClass, clickFunction) => {
            if (parent[name] == undefined) {
                parent[name] = createElement("div", wrapperClass);
                parent[name].entries = [];
                parent.appendChild(parent[name]);
                for (let x of values) {
                    var entry = createElement("div", entryClass);
                    entry.value = x.value;
                    entry.date = x.date;
                    entry.innerHTML = x.value;
                    entry.onclick = clickFunction;
                    parent[name].entries.push(entry);
                    parent[name].appendChild(entry);
                }
            }
            var entries = parent[name].entries;
            for (let entry of entries) {
                let value = values.find(x => x.value == entry.value);
                if (value == undefined) {
                    entry.classList.add("notVisible");
                }
                else {
                    entry.date = value.date;

                    entry.classList.remove("notVisible");
                    if (value.exists) {
                        entry.classList.remove("notExisting");
                        entry.exists = true;
                    }
                    else {
                        entry.classList.add("notExisting");
                        entry.exists = false;
                    }
                    if (value.current) {
                        entry.classList.add("current");
                        parent[name].current = entry;
                    }
                    else {
                        entry.classList.remove("current");
                    }
                }
            }
            document.entries = entries;
            document.values = values;

        };
        var clickFunction = function () { if (this.exists) { sideBar.scrollToDate(this.date); } }
        createDateBar(days, "dayWrapper", sideBar, "sideBarWrapper", "sideBarEntry days", clickFunction);
        createDateBar(months, "monthWrapper", sideBar, "sideBarWrapper", "sideBarEntry months", clickFunction);
        createDateBar(years, "yearWrapper", sideBar, "sideBarWrapper", "sideBarEntry years", clickFunction);
    };
    sideBar.scrollToDate = function (date) {
        if (date == undefined || isNaN(date)) { console.log("invalid Date"); return; }
        var data = Imagery.GetDataFromDay(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
        let imageryThermIdx = Imagery.ImageModes.indexOf("therm");
        let imageryHVCTIdx = Imagery.ImageModes.indexOf("hvct");
        while (scrollBox.childElementCount > 0) {
            scrollBox.removeChild(scrollBox.firstChild);
        }
        var datawithTherm = data.filter(x => x.ModeIds.indexOf(imageryThermIdx) > -1);
        for (var z of datawithTherm) {
            let column = createElement("div", "row");
            let thermImg = createElement("div", "cell");
            thermImg.setAttribute("style", "background-image:url(" + Imagery.GetImageLinkFromId(z.IDs[imageryThermIdx]) + ");");
            thermImg.onclick = () => window.open(Imagery.GetImageLinkFromId(z.IDs[imageryThermIdx]));
            column.appendChild(thermImg);
            let hvctId = z.ModeIds.indexOf(imageryHVCTIdx);
            if (hvctId > -1) {
                let hvctImg = createElement("div", "cell");
                hvctImg.setAttribute("style", "background-image:url(" + Imagery.GetImageLinkFromId(z.IDs[imageryHVCTIdx]) + ");");
                hvctImg.onclick = () => window.open(Imagery.GetImageLinkFromId(z.IDs[imageryHVCTIdx]));
                column.appendChild(hvctImg);
            }
            scrollBox.appendChild(column);
        }
        sideBar.Date = date;
        this.updatesideBar(date);
    }
    sideBar.scrollFunction = (e) => {
        let date = sideBar.dayWrapper.current.date;
        let previousDate = Imagery.GetOldestDate(date.getUTCFullYear(), 1 + date.getUTCMonth(), date.getUTCDate());
        let nextDate = Imagery.GetNewestDate(date.getUTCFullYear(), 1 + date.getUTCMonth(), date.getUTCDate());
        if (e.ctrlKey) { return; }
        //    console.log("date:", date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        //  console.log("previos date:", previousDate.getUTCFullYear(), previousDate.getUTCMonth(), previousDate.getUTCDate());
        //  console.log("next date:", nextDate.getUTCFullYear(), nextDate.getUTCMonth(), nextDate.getUTCDate());


        if (e.deltaY < 0) {
            //  console.log("up", date,
            //Imagery.GetNewestDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
            sideBar.scrollToDate(previousDate);
        }
        else {
            sideBar.scrollToDate(nextDate);
        }
    }
    sideBar.scrollToDate(sideBar.Date);
    //scrollBox.addEventListener("wheel", sideBar.scrollFunction);
    sideBar.addEventListener("wheel", sideBar.scrollFunction);

    mainCBox.appendChild(sideBar);
    var loadImages = function (dataArray) {
        //    let preferedModes = ["therm", "msa"];
        preferedModes = preferedModes.map(x => x.Index = Imagery.ImageModes.indexOf(x.ModeName));
        for (let data of dataArray) {
            let existingModes = data.ModeIds.filter(x => preferedModes.indexOf(x) > -1);
            if (existingModes.length == 0) { continue; }
            var satContainer = createElement("div", "satContainer");
            var satString = "&#x1f6f0;noaa" + data.sat +
                existingModes.map(x => {
                    var imageLink = Imagery.GetImageLinkFromId(data.IDs[x]);
                });
        }
    }
    mainCBox.preLoadImagesCount = 5;
    mainCBox.loadImages = function () {
        return;
        this.newestDates = Imagery.GetImagesFromMode("therm");
        var links = [];
        if (this.startIdx == undefined) { this.startIdx = 0; }
        for (var idx = this.startIdx; idx < this.newestDates.length; idx++) {
            var date = this.newestDates[idx];
            console.log("Z:" + this.newestDates.indexOf(date));
            var newData = Imagery.Data[(date)];
            if (newData == undefined || date == undefined || date >= firstBox.oldestDate) {
                continue;
            }
            var DataContainer = {
                Date: date,
                Links: []
            };
            firstBox.oldestDate = date;
            for (var modeStr of preferedModes) {
                var idx = Imagery.ImageModes.indexOf(modeStr);
                if (newData.ModeIds.indexOf(idx) > -1) {
                    DataContainer.Links.push({
                        Link: Imagery.GetImageURLByDate(date, modeStr),
                        Mode: modeStr
                    });

                }
            }
            if (DataContainer.Links.length > 0) {
                links.push(DataContainer);
            }
            if (links.length == this.preLoadImagesCount) {
                if (this.preLoadImagesCount > 1) { this.preLoadImagesCount = 1; }
                this.startIdx = idx;
                break;
            }
        }
        console.log(links.length);
        for (var link of links) {

            var imageContainer = createElement("div", "ImgContainer");
            if (link.Links === undefined || link.Links.length == 0) {
                continue;
            }
            for (var lnk of link.Links) {
                var thermImg = createElement("div", "Img");
                thermImg.style.backgroundImage = "url('" + lnk.Link + "')";
                thermImg.innerHTML = lnk.Mode + " " + ('0' + link.Date.getHours()).slice(-2) + ":" + ('0' + link.Date.getMinutes()).slice(-2) + " " + ('0' + link.Date.getUTCDate()).slice(-2) + "-" + ('0' + (link.Date.getUTCMonth() + 1)).slice(-2) + "-" + link.Date.getUTCFullYear();
                imageContainer.appendChild(thermImg);
            }
            if (firstBox.childElementCount > 10) {
                firstBox.removeChild(firstBox.children[0]);
            }
            if (imageContainer.childElementCount > 0) {
                firstBox.appendChild(imageContainer);
            }
        }
        document.isLoading = false;
    };
    //mainCBox.loadImages();

}
function createLoaderUI() {
    loader = createElement("div", "loader");
    document.parent.appendChild(loader);
    var el = createElement("div", "loaderTitle heading");
    el.innerText = "Loading ...";
    loader.appendChild(el);

    loader.style.animation = "1s cubic-bezier(0.16, 0.27, 0.09, 1.05) 0s normal none 1 running dialog_down";
}
function createTopBarIndex(title, box) {
    var vr = createElement("div", "topBarEntry");
    vr.innerHTML = title;
    topBar.appendChild(vr);
    docBo.appendChild(box);
    boxes.push(box);
    vr.shownBox = box;
    for (var z of boxes) {
        z.style.display = "none";
        z.isVisible = false;
    }
    if (defaultShownBox != undefined) {
        defaultShownBox.style.display = "initial";
        defaultShownBox.isVisible = true;
    }
    vr.onclick = function () {
        for (var z of boxes) {
            z.style.display = "none";
            z.isVisible = false;
        }
        this.shownBox.style.display = "initial";
        this.shownBox.isVisible = true;
    }
}
