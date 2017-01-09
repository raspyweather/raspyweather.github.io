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

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
function createQuery(pageTokenValue="") {
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
            //console.log(z+"["+this.parameters[z]+"]");
        }
        query = this.baseURL + query.substring(1);
        console.log(query + "\n\n");
        return query;
    };
    return query.getURL();
    //var query= baseURL+"&"+"maxSize";
}
function getFileList(jsonSTR="") {
    var nextPageToken = "";
    if (jsonSTR) {
        var doc = JSON.parse(jsonSTR);
        nextPageToken = doc.nextPageToken;
        for (var z in doc.files) {
            files.push(doc.files[z]);
        }
        if (!nextPageToken) {
            console.log(files.length + " files loaded");
            onFilesLoaded();
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
            onLogLoad();
            continue;
        }
        var id = files[i].id;
        var sat = parseInt(nam.substring(5, 7));
        var sat = parseInt(nam.substring(5, 7));
        var mod = nam.substring(21, nam.length - 4);
        var dat = new Date(nam.substring(8, 12) + "-" +
            nam.substring(12, 14) + "-" +
            nam.substring(14, 16) + " " +
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
    
Imagery.Dates=Imagery.Dates.sort(function(a,b){ return b-a;}); 
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
	resultDates=resultDates.sort(function(a,b){ return b-a;}); 
        return resultDates;
    };
    onDataProcessed();
}
function onLoadStart() {
    getFileList();
    createLoaderUI();
}
function onLogLoad() {
    var url = "https://www.googleapis.com/drive/v3/files/0B-HW4voEJgOgdmVtSFhBd0NCUm8?alt=media&key=AIzaSyDcPAYckM8eq3NkntNijLzq_pI2p-n_-SA";
    httpGetAsync(url, createLogBox);
}
function onFilesLoaded() {
    processData();
}
function onDataProcessed() {
    createMainUI();
    createStartBox();
    createFilterExplanation();
}
function createElement(tag, className) {
    var el = document.createElement(tag);
    el.className = className;
    return el;
}
function createLogBox(logContent) {
    var firstBox = createElement("pre", "box");
    firstBox.innerHTML = logContent;
    createTopBarIndex("Upload log", firstBox);
}
function createMainUI() {
    loader.style.animation = "1s cubic-bezier(0.47, 0, 0.74, 0.71) normal none 1 running dialog_up";
    setTimeout(function () {
        loader.remove();
        topBar.style.animation = "topBar_moveRight 1s linear 1";
        document.body.appendChild(topBar);
        document.body.appendChild(docBo);
    },1000);

}
function createFilterExplanation(){
	var firstBox=createElement("div","box");
	createTopBarIndex("Filters",firstBox);
	for(var filter of Imagery.ImageModes)
	{
		if(!filter)
		{
			continue;
		}
		var row= createElement("div","FilterRow");
		var title=createElement("h2","title FilterRow");
		var text=createElement("div","FilterText");
		var img = createElement("div","FilterImage");
		var sampleImages=Imagery.GetDatesWithMode(filter);
		img.style.backgroundImage = "url('" +Imagery.GetImageURLByDate(sampleImages[0],filter) + "') , url('" +Imagery.GetImageURLByDate(sampleImages[1],filter) + "')";
		title.innerHTML=filter;
		text.innerHTML="sampleText";
		row.appendChild(text);
		row.appendChild(img);
		firstBox.appendChild(title);
		firstBox.appendChild(row);
	}
	
}
function createStartBox() {
    var firstBox = createElement("div", "box");
    var preferedModes = ["therm", "msa"];
    defaultShownBox = firstBox;
    createTopBarIndex("Latest Images", firstBox);
    var newestDates = Imagery.GetDatesWithMode("therm");
    //newestDates=newestDates.slice(newestDates.length-5);
    var links = [];
    for (var date of newestDates) {
        var newData = Imagery.Data[(date)];
        var DataContainer = [];
        if (newData == undefined || date == undefined) {
            continue;
        }
        for (var modeStr of preferedModes) {
            var idx = Imagery.ImageModes.indexOf(modeStr);
            if (newData.ModeIds.indexOf(idx) > -1) {
                DataContainer.push(Imagery.GetImageURLByDate(date, modeStr));
                /*links.push(Imagery.GetImageByDate(newestDates[date], preferedModes[modeStr]));*/
            }
        }
        if (DataContainer.length > 0) {
            links.push(DataContainer);
        }
        if (links.length == 5) {
            break;
        }
    }
    for (var link of links) {
        var imageContainer = createElement("div", "ImgContainer");
        if (link === undefined) {
            continue;
        }
        for (var lnk of link) {
            var thermImg = createElement("div", "Img");
            thermImg.style.backgroundImage = "url('" + lnk + "')";
            imageContainer.appendChild(thermImg);

        }
        if (imageContainer.childElementCount > 0) {
            firstBox.appendChild(imageContainer);
        }
    }
}
function createLoaderUI() {
    loader = createElement("div", "loader");
    document.body.appendChild(loader);
    var el = createElement("div", "loaderTitle heading");
    el.innerText = "Loading ...";
    loader.appendChild(el);
    docBo = createElement("div", "mainBox");
    topBar = createElement("div", "topBar");
    loader.style.animation="1s cubic-bezier(0.16, 0.27, 0.09, 1.05) 0s normal none 1 running dialog_down";
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
    }
    defaultShownBox.style.display = "initial";
    vr.onclick = function () {
        for (var z of boxes) {
            z.style.display = "none";
        }
        this.shownBox.style.display = "initial";
    }
}
