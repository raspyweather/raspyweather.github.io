var Imagery;
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
function loadAllData() {
    var url = "https://www.googleapis.com/drive/v3/files?q=%270B-HW4voEJgOgamFpanhnVlVwRzA%27+in+parents&key=AIzaSyDcPAYckM8eq3NkntNijLzq_pI2p-n_-SA";
    httpGetAsync(url, processData);
}
function processData(data) {

    Imagery = {
        Dates: [],
        ImageModes: [],
        Satellites: [],
        Data: [],
        BaseURL: "https://docs.google.com/uc?id=",
        ImagesCount: 0
    };
    //Data per file:
    // unique stuff: Dates,ImageModes,Satellites,ID
    // get ID by Date, Data contains ref to imageMode & satellites
    //path
    //
    var parsedData = JSON.parse(data);
    for (var i = 0; i < parsedData.files.length; i++) {
        var nam = parsedData.files[i].name;
        var sat = parseInt(nam.substring(5, 7));
        var dat = new Date(nam.substring(8, 12) + "/" +
                           nam.substring(12, 14) + "/" +
                           nam.substring(14, 16) + "/" +
                           nam.substring(16, 18) + ":" +
                           nam.substring(18, 20));
        var mod = nam.substring(21, nam.length - 4);
        var id = parsedData.files[i].id;
        Imagery.Satellites.pushIfNotExist(sat);
        Imagery.ImageModes.pushIfNotExist(mod);
        if (Imagery.Data[dat] == undefined) {
            Imagery.Dates.push(dat);
            Imagery.Data[dat] = {
                ModeIds: [Imagery.ImageModes.indexOf(mod)],
                Sat: sat,
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
    Imagery.DateToString = function (dat) {
        return dat.getUTCFullYear().toString().padLeft(4, "0")
                + (dat.getUTCMonth() + 1).toString().padLeft(2, "0")
                + dat.getUTCDate().toString().padLeft(2, "0")
                + dat.getUTCHours().toString().padLeft(2, "0")
                + dat.getUTCMinutes().toString().padLeft(2, "0");
    }
    Imagery.GetImageByDate = function (dat, mode) {
        return this.BaseURL + Imagery.Data[dat].IDs[Imagery.ImageModes.indexOf(mode)];
    };
    Imagery.GetImageURLByIndex = function (idx) {
        var ctr = 0;
        for (var i = 0; i < Imagery.Data.length; i++) {
            ctr = ctr + Imagery.Data[i].length;
            if (ctr > idx) {
                ctr = ctr - Imagery.Data[i].length;
                return Imagery.BaseURL + Imagery.Data[Imagery.Dates[idx - ctr]].ID;
            }
        }
        return Imagery.BaseURL + Imagery.Data[Imagery.Dates[idx]].ID;
    };
    Imagery.GetImageNameByIndex = function (idx) {
        return "noaa-" +
            Imagery.Data[Imagery.Dates[idx]].Sat + "-"
          + Imagery.DateToString(Imagery.Dates[idx]) + "-"
          + Imagery.ImageModes[Imagery.Data[Imagery.Dates[idx]].ModeId] + ".jpg";
    };
Imagery.GetNewestDate=function(oldDate)
{
 var newestdate=Imagery.Dates[0];
for(var i in Imagery.Dates)
{
      if ( i> newestdate && i < oldDate )
      {
      newestdate= i;
      }
}
return newestdate;
};
    Imagery.GetNewestDate = function () {
        var newestDate = Imagery.Dates[0];
        for (var i in Imagery.Dates) {
            if (i > newestDate) {
                newestDate = i;
            }
        }
        return newestDate;
    };
    if (this.OnDataProcessed != null) {
        this.OnDataProcessed();
    }
}
var loader;
var topBar;
var docBo;
function createLoaderUI() {
    loader = createElement("div", "loader");
    document.body.appendChild(loader);
    var el = createElement("div", "loaderTitle heading");
    el.innerText = "Loading ...";
    loader.appendChild(el);
    setTimeout(createMainUI, 3000);
    loader.style.animation = "dialog_down 1s cubic-bezier(.16,.27,.09,1.05) 1 , dialog_up 1s cubic-bezier(.47,0,.74,.71) 2s 1";
    loadAllData();
}
function createMainUI() {
    loader.remove();
    topBar = createElement("div", "topBar");
    topBar.style.animation = "topBar_moveRight 1s linear 1";
    document.body.appendChild(topBar);
    createStartBox();
    document.body.appendChild(docBo);
}
function getDatesWithMode(modeStr)
{
    var dates=[];
    var sortDates=Imagery.Dates.sort();
    var modeIdx=Imagery.ImageModes.indexOf(modeStr);
    for( var dateIdx in sortDates)
    {
        var data=Imagery.Data[sortDates[dateIdx]];
        if(data==undefined){
            continue;
        }
        if( data.ModeIds.indexOf(modeIdx)>-1)
        {
            dates.push(sortDates[dateIdx]);
        }
    }
    return dates;
}
function createStartBox() {
    
    var preferedModes = ["therm", "msa"];
    docBo = createElement("div", "");
    var newestDates=getDatesWithMode("therm");
    //newestDates=newestDates.slice(newestDates.length-5);
    var links=[];
    for(var date in newestDates)
    {
        var newData=Imagery.Data[newestDates[date]];
        var DateContainer = new [];
        if(newData == undefined)
        {
            continue;
        }
        for(var modeStr in preferedModes)
        {
            var idx=Imagery.ImageModes.indexOf(preferedModes[modeStr]);
            if(newData.ModeIds.indexOf(idx)>-1)
            {
                DataContainer.push(Imagery.GetImageByDate(newestDates[date], preferedModes[modeStr]));
                /*links.push(Imagery.GetImageByDate(newestDates[date], preferedModes[modeStr]));*/
            }
        }
        if(DataContainer.lenght>0)
        {
            links.push(DataContainer);
        }
        if(links.length==5)
        { 
           break;
        }
    }
    for( var link in links)
    {
        var imageContainer=createElement("div","img");
        for(var lnk in link)
        {
            var thermImg = createElement("div", "Img");
            imageContainer.appendChild(thermImg);
            thermImg.style.backgroundImage = "url('" + links[link] + "')";
        }
        docBo.appendChild(imageContainer);
    }
}

//function createSlider() {
//    if (docBox != null) {
//        docBox.remove();
//    }
//    docBox = createElement("div", "documentBox");
//    document.body.appendChild(docBox);
//    var el = createElement("div", "sliderBox");
//    docBox.appendChild(el);
//    var slider = {
//        Images: null,
//        RecentItems: null,
//        ScrollPosition: 0
//        //        Container: 
//    };
//}

function createElement(tag, className) {
    var el = document.createElement(tag);
    el.className = className;
    return el;
}
