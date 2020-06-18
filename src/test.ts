import express from 'express';
import { JSDOM } from 'jsdom';
import fs from 'fs';

var x = fs.readFileSync('src/simply-static-1/layouts/landingpage_layout_01/index.html','utf8');

var html = new JSDOM(x).window.document;
var document = html

console.log(typeof(document));

export interface IElement {
    id: string,
    name: string,
    elementType: string
    numChildNodes?: number
}
  
export interface IElementContent {
    id: string,
    name: string,
    elementType: string,
    content: string
}
  
const app = express();
const port = 3000;
app.use(express.static('src/simply-static-1'));
  
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});

var json = []


document.querySelectorAll('[customizable]').forEach(element => {
    if(element.getAttribute("id") == undefined){
      element.setAttribute("id", "testId" + Math.floor(Math.random() * Math.floor(10000)));
    }
    var numChilds: number = undefined;
    if(element.tagName == "UL" || element.tagName == "OL"){
      numChilds = element.querySelectorAll('li').length;
    }
    var newElement: IElement = {
      id: element.getAttribute("id"),
      name: element.getAttribute("customizable"),
      elementType: element.tagName,
      numChildNodes: numChilds
    }

    json.push(newElement);
  });
console.log(json)

var domElement = document.getElementById(json[0].id);
console.log(typeof(domElement));

var ulElementContent = ["Test1", "Test2", "Test3", "Test4", "Test5"];

var listElements = document.getElementById(json[4].id).querySelectorAll('li')
if(listElements.length != ulElementContent.length){
    console.log("ERROR");
}
for(var index = 0; index < listElements.length; index++){
    listElements[index].textContent = ulElementContent[index];
}

document.getElementById(json[1].id).textContent = "test"

fs.writeFileSync('src/simply-static-1/layouts/landingpage_layout_01/indexNew.html', document.querySelector('html').outerHTML);