var Imagery;
var files = [];
var loader;
var boxes = [];
var defaultShownBox;
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
function getBase64Content(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () { callback(reader.result); }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
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
function loadImageToCanvas(imgId, canv, cont, img, callback) {
    var url = "https://www.googleapis.com/drive/v3/files/" + imgId + "?alt=media&key=AIzaSyDcPAYckM8eq3NkntNijLzq_pI2p-n_-SA";
    getBase64Content(url, function (x) {
        img.onload = function () {
            console.log("drawing: " + x.length);
            canv.width = img.naturalWidth;
            canv.height = img.naturalHeight;
            cont.drawImage(img, 0, 0, img.width, img.height);
        };
        img.src = x;
        console.log("ret");
        callback(canv, cont, img);
    });
};
function rgbH(r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16);
}
var temps = [60, 58.75, 58.125, 57.5, 56.875, 56.25, 55.625, 55, 54.375, 53.75, 53.125, 52.5, 51.875, 51.25, 50.625, 50, 49.375, 48.75, 48.125, 47.5, 46.875, 46.25, 45.625, 45, 44.375, 43.75, 43.125, 42.5, 41.875, 41.25, 40.625, 40, 39.375, 38.75, 38.125, 37.5, 36.875, 36.25, 35.625, 35, 34.375, 33.75, 33.125, 32.5, 31.875, 31.25, 30.625, 30, 29.375, 28.75, 28.125, 27.5, 26.875, 26.25, 25.625, 25, 24.375, 23.75, 23.125, 22.5, 21.875, 21.25, 20.625, 20, 19.375, 18.75, 18.125, 17.5, 16.875, 16.25, 15.625, 15, 14.375, 13.75, 13.125, 12.5, 11.875, 11.25, 10.625, 10, 9.375, 8.75, 8.125, 7.5, 6.875, 6.25, 5.625, 5, 4.375, 3.75, 3.125, 2.5, 1.875, 1.25, 0.625, 0, -0.625, -1.25, -1.875, -2.5, -3.125, -3.75, -4.375, -5, -5.625, -6.25, -6.875, -7.5, -8.125, -8.75, -9.375, -10, -10.625, -11.25, -11.875, -12.5, -13.125, -13.75, -14.375, -15, -15.625, -16.25, -16.875, -17.5, -18.125, -18.75, -19.375, -20, -20.625, -21.25, -21.875, -22.5, -23.125, -23.75, -24.375, -25, -25.625, -26.25, -26.875, -27.5, -28.125, -28.75, -29.375, -30, -30.625, -31.25, -31.875, -32.5, -33.125, -33.75, -34.375, -35, -35.625, -36.25, -36.875, -37.5, -38.125, -38.75, -39.375, -40, -40.625, -41.25, -41.875, -42.5, -43.125, -43.75, -44.375, -45, -45.625, -46.25, -46.875, -47.5, -48.125, -48.75, -49.375, -50, -50.625, -51.25, -51.875, -52.5, -53.125, -53.75, -54.375, -55, -55.625, -56.25, -56.875, -57.5, -58.125, -58.75, -59.375, -60, -60.625, -61.25, -61.875, -62.5, -63.125, -63.75, -64.375, -65, -65.625, -66.25, -66.875, -67.5, -68.125, -68.75, -69.375, -70, -70.625, -71.25, -71.875, -72.5, -73.125, -73.75, -74.375, -75, -75.625, -76.25, -76.875, -77.5, -78.125, -78.75, -79.375, -80, -80.625, -81.25, -81.875, -82.5, -83.125, -83.75, -84.375, -85, -85.625, -86.25, -86.875, -87.5, -88.125, -88.75, -89.375, -90, -90.625, -91.25, -91.875, -92.5, -93.125, -93.75, -94.375, -95, -95.625, -96.25, -96.875, -97.5, -98.125, -98.75, -99.375];
var colors = [[204, 0, 0], [200, 0, 0], [194, 0, 0], [189, 0, 0], [186, 0, 0], [182, 0, 0], [177, 0, 0], [173, 0, 0], [169, 0, 0], [165, 0, 0], [161, 0, 0], [158, 0, 0], [155, 0, 0], [151, 0, 0], [142, 0, 0], [193, 5, 0], [250, 13, 0], [251, 15, 0], [243, 20, 0], [241, 26, 0], [239, 31, 0], [236, 35, 0], [234, 40, 0], [231, 44, 0], [229, 47, 0], [226, 51, 0], [222, 57, 0], [220, 61, 0], [217, 64, 0], [214, 67, 0], [211, 71, 0], [208, 74, 0], [205, 77, 0], [202, 80, 0], [198, 84, 0], [195, 87, 0], [192, 89, 0], [189, 92, 0], [186, 93, 0], [183, 95, 0], [180, 97, 0], [178, 99, 0], [174, 101, 0], [171, 102, 0], [168, 103, 0], [165, 104, 0], [163, 106, 0], [160, 107, 0], [158, 109, 0], [156, 110, 0], [154, 112, 0], [151, 113, 0], [149, 114, 0], [146, 114, 0], [138, 110, 0], [187, 153, 0], [242, 202, 0], [242, 207, 0], [234, 206, 0], [232, 209, 0], [230, 212, 0], [227, 213, 0], [225, 213, 0], [222, 213, 0], [220, 212, 0], [217, 212, 0], [213, 212, 0], [211, 210, 0], [208, 209, 0], [204, 206, 0], [200, 203, 0], [195, 200, 0], [191, 198, 0], [187, 195, 0], [182, 191, 0], [178, 189, 0], [173, 186, 0], [169, 183, 0], [165, 181, 0], [161, 178, 0], [157, 176, 0], [154, 173, 0], [150, 169, 0], [146, 167, 0], [143, 165, 0], [140, 162, 0], [135, 161, 0], [131, 159, 0], [127, 157, 0], [123, 154, 0], [117, 152, 0], [113, 150, 0], [109, 149, 0], [104, 146, 0], [96, 138, 0], [126, 187, 0], [158, 242, 0], [155, 243, 0], [143, 235, 0], [139, 233, 0], [133, 231, 0], [127, 228, 0], [122, 226, 0], [116, 223, 0], [110, 221, 0], [104, 219, 0], [93, 216, 0], [84, 213, 0], [79, 210, 0], [78, 207, 0], [78, 205, 0], [79, 202, 0], [79, 200, 1], [73, 197, 8], [63, 193, 23], [57, 191, 36], [52, 189, 43], [49, 186, 48], [46, 184, 53], [43, 181, 59], [40, 178, 65], [36, 175, 69], [32, 172, 75], [29, 170, 80], [26, 168, 85], [23, 165, 89], [21, 163, 95], [18, 161, 99], [16, 159, 103], [13, 157, 107], [9, 155, 113], [7, 153, 117], [4, 151, 121], [1, 148, 124], [0, 142, 122], [0, 185, 164], [0, 234, 207], [0, 234, 210], [0, 226, 204], [0, 224, 203], [0, 222, 203], [0, 219, 203], [0, 217, 203], [0, 214, 204], [0, 212, 204], [0, 210, 204], [0, 207, 203], [0, 204, 202], [0, 202, 201], [0, 198, 198], [0, 194, 197], [0, 190, 194], [0, 186, 192], [0, 182, 190], [0, 177, 186], [0, 173, 183], [0, 170, 181], [0, 166, 179], [0, 162, 177], [0, 156, 174], [0, 150, 172], [0, 146, 170], [0, 140, 166], [0, 135, 164], [0, 130, 162], [0, 126, 160], [0, 121, 159], [0, 117, 157], [0, 113, 155], [0, 109, 153], [0, 104, 151], [0, 100, 150], [0, 97, 148], [0, 92, 145], [0, 84, 137], [0, 113, 191], [0, 144, 250], [0, 141, 252], [0, 130, 243], [0, 125, 240], [0, 120, 238], [0, 114, 236], [0, 108, 234], [0, 102, 231], [1, 97, 229], [2, 93, 226], [3, 85, 222], [4, 80, 220], [4, 75, 217], [5, 69, 214], [7, 65, 211], [7, 59, 208], [7, 54, 205], [8, 51, 202], [9, 45, 198], [10, 41, 195], [10, 37, 192], [11, 33, 189], [13, 28, 186], [13, 24, 183], [13, 21, 180], [14, 17, 177], [14, 13, 173], [14, 10, 171], [14, 6, 168], [15, 2, 165], [15, 0, 163], [18, 0, 160], [21, 0, 158], [23, 0, 156], [25, 0, 154], [27, 0, 151], [30, 0, 149], [32, 0, 146], [32, 0, 137], [49, 0, 191], [67, 0, 250], [71, 0, 252], [73, 0, 243], [77, 0, 240], [80, 0, 238], [83, 0, 235], [86, 0, 233], [89, 0, 230], [91, 0, 228], [93, 0, 225], [97, 0, 221], [99, 0, 218], [101, 0, 215], [104, 0, 212], [105, 0, 209], [104, 0, 206], [102, 0, 203], [100, 0, 200], [97, 0, 196], [95, 0, 192], [94, 0, 189], [92, 0, 186], [90, 0, 183], [88, 0, 180], [87, 0, 177], [86, 0, 174], [84, 0, 170], [82, 0, 167], [81, 0, 165], [80, 0, 162], [78, 0, 160], [77, 0, 157], [75, 0, 155], [74, 0, 152], [73, 0, 150], [72, 0, 148], [71, 0, 146], [70, 0, 145], [69, 0, 143]];
function getTemp(color) {
    var oIdx = 0;
    var i = 0;
    for (; i < colors.length; i++) {
        var c1 = colorComparision(color, colors[i]);
        var c2 = colorComparision(color, colors[oIdx]);
        if (c1 < c2) oIdx = i;
    }
    return temps[oIdx];
}
function colorComparision(color1, color2) {
    return (Math.abs(color1[0] - color2[0]) * Math.abs(color1[0] - color2[0]) +
        Math.abs(color1[1] - color2[1]) * Math.abs(color1[1] - color2[1]) +
        Math.abs(color1[2] - color2[2]) * Math.abs(color1[2] - color2[2])) / (3 * 255 * 255);
}
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
function createQuery(pageTokenValue = "") {
    var query = {
        baseURL: "https://www.googleapis.com/drive/v3/files?",
        parameters: {
            pageSize: 1000,
            q: "%270B-HW4voEJgOgamFpanhnVlVwRzA%27+in+parents",
            key: "AIzaSyDcPAYckM8eq3NkntNijLzq_pI2p-n_-SA",
            pageToken: pageTokenValue
        }
    };
    query.getURL = function () {
        var query = "";
        for (var z in this.parameters) {
            query += "&" + z + "=" + this.parameters[z];
        }
        query = this.baseURL + query.substring(1);
        console.log(query);
        return query;
    };
    return query.getURL();
    //var query= baseURL+"&"+"maxSize";
}
function getFileList(jsonSTR = "") {
    var nextPageToken = "";
    if (jsonSTR) {
        var doc = JSON.parse(jsonSTR);
        nextPageToken = doc.nextPageToken;
        for (var z in doc.files) {
            files.push(doc.files[z]);
        }
        if (!nextPageToken) {
            console.log(files.length + " files loaded");
            document.onFilesLoaded.dispatchEvent();
            return;
        }
    }
    httpGetAsync(createQuery(nextPageToken), getFileList);
}
function processData() {
    Imagery = {
        Dates: [],
        ImageModes: [],
        Satellites: [],
        Data: [],
        BaseURL: "https://docs.google.com/uc?id=",
        ImagesCount: 0,
        LogFileId: ""
    };
    //Data per file:
    // unique stuff: Dates,ImageModes,Satellites,ID
    // get ID by Date, Data contains ref to imageMode & satellites
    //path
    for (var i = 0; i < files.length; i++) {
        var nam = files[i].name;
        if (nam.endsWith(".log")) {
            Imagery.LogFileId = files[i].id;
            document.onLogLoad.dispatchEvent();
            continue;
        }
        var id = files[i].id;
        var sat = parseInt(nam.substring(5, 7));
        var sat = parseInt(nam.substring(5, 7));
        var mod = nam.substring(21, nam.length - 4);
        var dat = new Date(nam.substring(8, 12) + "/" +
            nam.substring(12, 14) + "/" +
            nam.substring(14, 16) + "/" +
            nam.substring(16, 18) + ":" +
            nam.substring(18, 20));
        Imagery.Satellites.pushIfNotExist(sat);
        Imagery.ImageModes.pushIfNotExist(mod);
        if (Imagery.Data[dat] == undefined) {
            Imagery.Dates.push(dat);
            Imagery.Data[dat] = {
                Sat: sat,
                ModeIds: [Imagery.ImageModes.indexOf(mod)],
                IDs: {}
            };
            Imagery.Data[dat].IDs[Imagery.ImageModes.indexOf(mod)] = id;
        }
        else {
            Imagery.Data[dat].ModeIds.push(Imagery.ImageModes.indexOf(mod));
            Imagery.Data[dat].IDs[Imagery.ImageModes.indexOf(mod)] = id;
        }
        Imagery.ImagesCount++;
    }
    Imagery.Dates.sort((x, y) => {
        return y > x;
    })
        ;
    Imagery.DateToString = function (dat) {
        return dat.getUTCFullYear().toString().padLeft(4, "0")
            + (dat.getUTCMonth() + 1).toString().padLeft(2, "0")
            + dat.getUTCDate().toString().padLeft(2, "0")
            + dat.getUTCHours().toString().padLeft(2, "0")
            + dat.getUTCMinutes().toString().padLeft(2, "0");
    };
    Imagery.GetImageURLByDate = function (dat, modeStr) {
        return this.BaseURL + this.Data[dat].IDs[this.ImageModes.indexOf(modeStr)];
    };
    Imagery.GetImageURLFromData = function (data, modeStr) {
        return this.BaseURL + data.IDs[this.ImageModes.indexOf(modeStr)];
    };
    Imagery.GetDatesWithMode = function (modeStr) {
        var modeIdx = this.ImageModes.indexOf(modeStr);
        var resultDates = [];
        for (var z = 0; z < this.Dates.length; z++) {
            if (this.Data[this.Dates[z]].ModeIds.indexOf(modeIdx) > -1) {
                resultDates.push(this.Dates[z]);
            }
        }
        return resultDates;
    };
    Imagery.GetImagesByDay = function (year, month, day) {
        var res = this.Dates.filter(x => {
            return (x.getFullYear() == year) && (x.getDate() == day) && (x.getMonth() + 1 == month);
        });
    };
    document.onDataProcessed.dispatchEvent();
}
createEventHandler('onLoadStart', document);
createEventHandler('onLogLoad', document);
createEventHandler('onFilesLoaded', document);
createEventHandler('onDataProcessed', document);

document.onLoadStart.addEventListener(getFileList);
document.onLogLoad.addEventListener(function () {
    var url = "https://www.googleapis.com/drive/v3/files/0B-HW4voEJgOgdmVtSFhBd0NCUm8?alt=media&key=AIzaSyDcPAYckM8eq3NkntNijLzq_pI2p-n_-SA";
    httpGetAsync(url, createLogBox);
});
document.onFilesLoaded.addEventListener(processData);

function createMainPageEvents() {
    document.onLoadStart.addEventListener(createLoaderUI);
    document.onDataProcessed.addEventListener(createMainUI);
    document.onDataProcessed.addEventListener(createStartBox);
    document.onDataProcessed.addEventListener(createThermalTemperatureView);
    document.onDataProcessed.addEventListener(createSearchGUI);
}
function createLogBox(logContent) {
    var firstBox = createElement("div", "box");
    firstBox.innerHTML = logContent;
    createTopBarIndex("Upload log", firstBox);
}
function createMainUI() {
    loader.style.animation = "1s cubic-bezier(0.47, 0, 0.74, 0.71) normal none 1 running dialog_up";
    setTimeout(function () {
        loader.remove();
        topBar.style.animation = "topBar_moveRight 1s linear 1";
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
    var sdPicker = createDatePicker(new Date());
    var startDateInput = sdPicker //createElement("input", "inputDate");
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
    var endDateInput = createElement("input", "inputDate");
    endDateInput.onblur = startDateInput.onblur;
    queryForm.append(endDateInput);
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
    var elemWrapper = createElement("div", "elementWrapper");
    elemWrapper.Values = [];
    var shownInput = createElement("input", "shownInputBox");
    var checkBoxWrapper = createElement("div", "checkboxWrapper");
    checkBoxWrapper.classList.add("hidden");
    shownInput.onclick = function () {
        shownInput.value = elemWrapper.Values.map(function (x) {
            return (document.getElementById(x.CheckBox).checked) ? x.Value : "";
        }).filter(n => n
            ).join();
        if (checkBoxWrapper.classList.contains("hidden")) {
            checkBoxWrapper.classList.remove("hidden");
            return;
        }
        checkBoxWrapper.classList.add("hidden");
    };
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
            checkBox.parentElement.onclick = function () {
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
        datePickerInput.Date.setFullYear(datePickerInput.Date.getFullYear() + 1);
        datePickerInput.update();
        e.stopImmediatePropagation();
    }, true);
    datePickerYearDec.addEventListener("click", function (e) {
        datePickerInput.Date.setFullYear(datePickerInput.Date.getFullYear() - 1);
        datePickerInput.update();
        e.stopImmediatePropagation();
    }, true);
    datePickerMonthInc.addEventListener("click", function (e) {
        datePickerInput.Date.setMonth(datePickerInput.Date.getMonth() + 1);
        datePickerInput.update();
        e.stopImmediatePropagation();
    }, true);
    datePickerMonthDec.addEventListener("click", function (e) {
        datePickerInput.Date.setMonth(datePickerInput.Date.getMonth() - 1);
        datePickerInput.update();
        e.stopImmediatePropagation();
    }, true);
    document.addEventListener("click", function () {
        if (datePickerInput.isVisible) {
            datePickerInput.hidePicker();
        }
    }, false);
    datePickerInput.addEventListener("click",
        function (e) {
            this.togglePicker();
            e.stopImmediatePropagation();
        }, true);
    datePickerWrapperBox.addEventListener("click", function (e) {
        e.stopImmediatePropagation();
    }, false);
    datePickerInput.Date = initialDate;
    datePickerInput.MonthDisplay = datePickerMonthDisplay;
    datePickerInput.YearDisplay = datePickerYearDisplay;
    datePickerInput.update = function () {
        this.MonthDisplay.innerHTML = this.Date.toLocaleString(navigator.language || navigator.userLanguage, { month: "long" })
        this.YearDisplay.innerHTML = this.Date.getFullYear();
        var dayBoxes = Array.slice(datePickerMonthBox.getElementsByClassName("datePickerDayBox"), []);
        var weeks = datePickerInput.getWeeks();
        for (var i = 0; i < 6; i++) {
            for (var ii = 0; ii < 7; ii++) {
                var datePickerInputDayBox = dayBoxes.find(x => { return x.columnIdx == i && x.rowIdx == ii; });
                datePickerMonthBox.appendChild(datePickerInputDayBox);
                if (weeks.length > i && weeks[i].length > ii && weeks[i][ii] != undefined) {
                    datePickerInputDayBox.innerHTML = weeks[i][ii].getDate();
                }
                else {
                    datePickerInputDayBox.innerHTML = "";
                }
            }
        }
        datePickerInput.value = datePickerInput.Date.getDate() + "." + datePickerInput.Date.getMonth() + "." + datePickerInput.Date.getFullYear();
    };
    datePickerInput.getWeeks = function () {
        var date = new Date(this.Date.getFullYear(), this.Date.getMonth(), 1);
        var initialMonth = date.getMonth();
        var previousDayOfWeek = 0;
        var weeks = [];
        var recentWeek = [];
        for (var z = 1; z < date.getDay(); z++) {
            recentWeek.push(undefined);
        }
        while (date.getMonth() == initialMonth) {
            if (date.getDay() == 1 && recentWeek.length > 0) {
                weeks.push(recentWeek);
                recentWeek = [];
            }
            previousDayOfWeek = date.getDay();
            recentWeek.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        weeks.push(recentWeek);
        return weeks;
    }
    datePickerInput.DayBoxes = [];

    var weeks = datePickerInput.getWeeks();
    for (var i = 0; i < 6; i++) {
        for (var ii = 0; ii < 7; ii++) {
            var datePickerInputDayBox = createElement("div", "datePickerDayBox centerFlexBox noselect");
            datePickerInputDayBox.rowIdx = ii;
            datePickerInputDayBox.columnIdx = i;
            datePickerMonthBox.appendChild(datePickerInputDayBox);
            datePickerInputDayBox.addEventListener("click", function (e) {
                datePickerInput.Date.setDate(this.innerHTML);
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
        loadImageToCanvas(
            Imagery.Data[x.explicitOriginalTarget.date].IDs[Imagery.ImageModes.indexOf("therm")],
            box.DrawObjects.canv,
            box.DrawObjects.cont,
            box.DrawObjects.img,
            function (canv, cont, img) {
                console.log("loaded");
                box.appendChild(canv);
                canv.onmousemove = function (mouseEvent) {

                    var offset = canv.getBoundingClientRect();
                    var point = { x: mouseEvent.clientX - offset.left, y: mouseEvent.clientY - offset.top };
                    var rgbv = cont.getImageData(point.x, point.y, 1, 1);
                    outputTemp.innerHTML = "Temperature:\t" + getTemp((rgbv.data)) + "°C";
                };
                document.addEventListener("mousemove", canv.onmousemove);
            });
    };
    sel.onchange({ explicitOriginalTarget: sel.options[0] });
}
function createStartBox() {
    var firstBox = createElement("div", "box");
    var preferedModes = ["therm", "msa"];
    defaultShownBox = firstBox;
    createTopBarIndex("Latest Images", firstBox);
    firstBox.preLoadImagesCount = 5;
    firstBox.loadImages = function () {
        this.newestDates = Imagery.GetDatesWithMode("therm");
        var links = [];
        if (this.startIdx == undefined) { this.startIdx = 0; }
        for (var idx = this.startIdx; idx < this.newestDates.length; idx++) 
        {
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
                if (this.preLoadImagesCount>1) { this.preLoadImagesCount = 1; }
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
                thermImg.innerHTML = lnk.Mode + " " + ('0' + link.Date.getHours()).slice(-2) + ":" + ('0' + link.Date.getMinutes()).slice(-2) + " " + ('0' + link.Date.getDate()).slice(-2) + "-" + ('0' + (link.Date.getMonth() + 1)).slice(-2) + "-" + link.Date.getFullYear();
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
    firstBox.loadImages();
    window.onscroll = function () {
        // if scroll to bottom is only 
        if ((window.scrollMaxY - window.scrollY )<document.documentElement.offsetHeight* 0.95 && firstBox.isVisible == true && document.isLoading == false) {
            console.log("add!");
            document.isLoading = true;
            firstBox.loadImages();
        }
    };
}
function createLoaderUI() {
    loader = createElement("div", "loader");
    document.parent.appendChild(loader);
    var el = createElement("div", "loaderTitle heading");
    el.innerText = "Loading ...";
    loader.appendChild(el);
    docBo = createElement("div", "mainBox");
    topBar = createElement("div", "topBar");
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
