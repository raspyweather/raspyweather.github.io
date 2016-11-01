// adds an element to the array if it does not already exist using a comparer 
// function
Array.prototype.pushIfNotExist = function (element) {
    if (this.indexOf(element)==-1) {
        this.push(element);
    }
};
String.prototype.padLeft = function (n,chr) {
    var res = this;
    while (n > res.length) {
        res = chr + res;
    }
    return res;
}
