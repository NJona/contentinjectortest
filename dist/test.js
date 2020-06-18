"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsdom_1 = require("jsdom");
const fs_1 = __importDefault(require("fs"));
var x = fs_1.default.readFileSync('src/simply-static-1/layouts/landingpage_layout_01/index.html', 'utf8');
var html = new jsdom_1.JSDOM(x).window.document;
var document = html;
console.log(typeof (document));
const app = express_1.default();
const port = 3000;
app.use(express_1.default.static('src/simply-static-1'));
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
var json = [];
document.querySelectorAll('[customizable]').forEach(element => {
    if (element.getAttribute("id") == undefined) {
        element.setAttribute("id", "testId" + Math.floor(Math.random() * Math.floor(10000)));
    }
    var numChilds = undefined;
    if (element.tagName == "UL" || element.tagName == "OL") {
        numChilds = element.querySelectorAll('li').length;
    }
    var newElement = {
        id: element.getAttribute("id"),
        name: element.getAttribute("customizable"),
        elementType: element.tagName,
        numChildNodes: numChilds
    };
    json.push(newElement);
});
console.log(json);
var domElement = document.getElementById(json[0].id);
console.log(typeof (domElement));
var ulElementContent = ["Test1", "Test2", "Test3", "Test4", "Test5"];
var listElements = document.getElementById(json[4].id).querySelectorAll('li');
if (listElements.length != ulElementContent.length) {
    console.log("ERROR");
}
for (var index = 0; index < listElements.length; index++) {
    listElements[index].textContent = ulElementContent[index];
}
document.getElementById(json[1].id).textContent = "test";
fs_1.default.writeFileSync('src/simply-static-1/layouts/landingpage_layout_01/indexNew.html', document.querySelector('html').outerHTML);
//# sourceMappingURL=test.js.map