'use strict';
//2020-10-27 start

//global renderHook
const renderHook = document.getElementById('renderHook');

//objects
//render helper
class RenderHelper {

    render(element, classes, attributeType, attributeVal, content, renderHook) {
        //receives: 
        //element type 
        //classes - one string OR array for multiple OR blank array for none
        //attribute type - one string OR array for multiple OR blank array for none
        //attribute val - one string OR array for multiple OR blank array for none
        //  note attribute type and value index should be paired with each other
        //  [src, alt] [fileloc, alt title]
        //text content - "" for none
        //where to render

        //build
        let myEl = document.createElement(element);
        Array.isArray(classes) ? 
            classes.forEach(c => {
                myEl.classList.add(c);
                }) : //false - no array
                myEl.classList.add(classes);
        Array.isArray(attributeType) ? 
            attributeType.forEach((a, index) => {
                myEl.setAttribute(a, attributeVal[index]);
                }) : //false - no array
                myEl.setAttribute(attributeType, attributeVal);
        myEl.textContent = content;
        renderHook.append(myEl);
        myEl = null;
    }
}

class TimeHelper {

    render (element, text) {
        let myEl = element;
        myEl.textContent = "";
        myEl.textContent = text;    
    }
}

class Time {
    time = 
    ['12:00 AM','12:30 AM','01:00 AM','01:30 AM','02:00 AM','02:30 AM','03:00 AM','03:30 AM'
    ,'04:00 AM','04:30 AM','05:00 AM','05:30 AM','06:00 AM','06:30 AM','07:00 AM','07:30 AM'
    ,'08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM'
    ,'12:00 PM','12:30 PM','01:00 PM','01:30 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM'
    ,'04:00 PM','04:30 PM','05:00 PM','05:30 PM','06:00 PM','06:30 PM','07:00 PM','07:30 PM'
    ,'08:00 PM','08:30 PM','09:00 PM','09:30 PM','10:00 PM','10:30 PM','11:00 PM','11:30 PM'] 
}

//create new home page and other objects
const myRenderHelper = new RenderHelper();
const myTimeHelper = new TimeHelper();


//data
//pacific, mountain, central, east
const p = new Time();
const m = new Time();
const c = new Time();
const e = new Time();

//build page
myRenderHelper.render("h1", [], [], [], 'US Time Converter', renderHook);

//**pTime */
myRenderHelper.render("h2", [], ['id', 'style'], ['pTime', 'display: inline'], " ", renderHook);
myRenderHelper.render("h2", ['zone'], ['style'], ['display: inline'], 'Pacific (Seattle)', renderHook);
myRenderHelper.render("input", []
, ['type', 'min', 'max', 'value', 'id'], ['range', '0', '47', '29', 'pTimeIn']
, p.time[0], renderHook);
let pTimeIn = document.getElementById("pTimeIn");

const pTimeText = document.getElementById('pTime');
pTimeText.textContent = p.time[pTimeIn.value];
pTimeIn.oninput = () => {
    myTimeHelper.render(pTimeText, p.time[pTimeIn.value]);
    //m
    if (parseInt(pTimeIn.value, 10) + 2 >= p.time.length) {
        myTimeHelper.render(mTimeText, m.time[parseInt(pTimeIn.value, 10) - p.time.length + 2]);
        mTimeIn.value=parseInt(pTimeIn.value, 10) - p.time.length + 2;    
    } else {
        myTimeHelper.render(mTimeText, m.time[parseInt(pTimeIn.value, 10) + 2]);
        mTimeIn.value=parseInt(pTimeIn.value, 10) + 2;    
    }
    //c
    if (parseInt(pTimeIn.value, 10) + 4 >= p.time.length) {
        myTimeHelper.render(cTimeText, c.time[parseInt(pTimeIn.value, 10) - p.time.length + 4]);
        cTimeIn.value=parseInt(pTimeIn.value, 10) - p.time.length + 4;    
    } else {
        myTimeHelper.render(cTimeText, c.time[parseInt(pTimeIn.value, 10) + 4]);
        cTimeIn.value=parseInt(pTimeIn.value, 10) + 4;    
    }
    //e
    if (parseInt(pTimeIn.value, 10) + 6 >= p.time.length) {
        myTimeHelper.render(eTimeText, e.time[parseInt(pTimeIn.value, 10) - p.time.length + 6]);
        eTimeIn.value=parseInt(pTimeIn.value, 10) - p.time.length + 6;    
    } else {
        myTimeHelper.render(eTimeText, e.time[parseInt(pTimeIn.value, 10) + 6]);
        eTimeIn.value=parseInt(pTimeIn.value, 10) + 6;    
    }
}

myRenderHelper.render("br", [], [], [], " ", renderHook);

//**mTime */
myRenderHelper.render("h2", [], ['id', 'style'], ['mTime', 'display: inline'], " ", renderHook);
myRenderHelper.render("h2", ['zone'], ['style'], ['display: inline'], 'Mountain (Denver)', renderHook);
myRenderHelper.render("input", []
, ['type', 'min', 'max', 'value', 'id'], ['range', '0', '47', '31', 'mTimeIn']
, m.time[0], renderHook);
let mTimeIn = document.getElementById("mTimeIn");

const mTimeText = document.getElementById('mTime');
mTimeText.textContent = m.time[mTimeIn.value];
mTimeIn.oninput = () => {
    myTimeHelper.render(mTimeText, m.time[mTimeIn.value]);
    //p
    if (parseInt(mTimeIn.value, 10) - 2 < 0) {
        myTimeHelper.render(pTimeText, p.time[parseInt(mTimeIn.value, 10) + m.time.length - 2]);
        pTimeIn.value=parseInt(mTimeIn.value, 10) + m.time.length - 2;    
    } else {
        myTimeHelper.render(pTimeText, p.time[parseInt(mTimeIn.value, 10) - 2]);
        pTimeIn.value=parseInt(mTimeIn.value, 10) - 2;    
    }
    //c
    if (parseInt(mTimeIn.value, 10) + 2 >= p.time.length) {
        myTimeHelper.render(cTimeText, c.time[parseInt(mTimeIn.value, 10) - p.time.length + 2]);
        cTimeIn.value=parseInt(mTimeIn.value, 10) - p.time.length + 2;    
    } else {
        myTimeHelper.render(cTimeText, c.time[parseInt(mTimeIn.value, 10) + 2]);
        cTimeIn.value=parseInt(mTimeIn.value, 10) + 2;    
    }
    //e
    if (parseInt(mTimeIn.value, 10) + 4 >= p.time.length) {
        myTimeHelper.render(eTimeText, e.time[parseInt(mTimeIn.value, 10) - p.time.length + 4]);
        eTimeIn.value=parseInt(mTimeIn.value, 10) - p.time.length + 4;    
    } else {
        myTimeHelper.render(eTimeText, e.time[parseInt(mTimeIn.value, 10) + 4]);
        eTimeIn.value=parseInt(mTimeIn.value, 10) + 4;    
    }
}

myRenderHelper.render("br", [], [], [], " ", renderHook);   

//**cTime */
myRenderHelper.render("h2", [], ['id', 'style'], ['cTime', 'display: inline'], " ", renderHook);
myRenderHelper.render("h2", ['zone'], ['style'], ['display: inline'], 'Central (Houston)', renderHook);
myRenderHelper.render("input", []
, ['type', 'min', 'max', 'value', 'id'], ['range', '0', '47', '33', 'cTimeIn']
, c.time[0], renderHook);
let cTimeIn = document.getElementById("cTimeIn");

const cTimeText = document.getElementById('cTime');
cTimeText.textContent = c.time[cTimeIn.value];
cTimeIn.oninput = () => {
    myTimeHelper.render(cTimeText, c.time[cTimeIn.value]);    
    //p
    if (parseInt(cTimeIn.value, 10) - 4 < 0) {
        myTimeHelper.render(pTimeText, p.time[parseInt(cTimeIn.value, 10) + c.time.length - 4]);
        pTimeIn.value=parseInt(cTimeIn.value, 10) + c.time.length - 4;    
    } else {
        myTimeHelper.render(pTimeText, p.time[parseInt(cTimeIn.value, 10) - 4]);
        pTimeIn.value=parseInt(cTimeIn.value, 10) - 4;    
    }
    //m
    if (parseInt(cTimeIn.value, 10) - 2 < 0) {
        myTimeHelper.render(mTimeText, m.time[parseInt(cTimeIn.value, 10) + c.time.length - 2]);
        mTimeIn.value=parseInt(cTimeIn.value, 10) + c.time.length - 2;    
    } else {
        myTimeHelper.render(mTimeText, m.time[parseInt(cTimeIn.value, 10) - 2]);
        mTimeIn.value=parseInt(cTimeIn.value, 10) - 2;    
    }
    //e
    if (parseInt(cTimeIn.value, 10) + 2 >= c.time.length) {
        myTimeHelper.render(eTimeText, e.time[parseInt(cTimeIn.value, 10) - c.time.length + 2]);
        eTimeIn.value=parseInt(cTimeIn.value, 10) - c.time.length + 2;    
    } else {
        myTimeHelper.render(eTimeText, e.time[parseInt(cTimeIn.value, 10) + 2]);
        eTimeIn.value=parseInt(cTimeIn.value, 10) + 2;    
    }
}

myRenderHelper.render("br", [], [], [], " ", renderHook);

//**eTime */
myRenderHelper.render("h2", [], ['id', 'style'], ['eTime', 'display: inline'], " ", renderHook);
myRenderHelper.render("h2", ['zone'], ['style'], ['display: inline'], 'Eastern (New York)', renderHook);
myRenderHelper.render("input", []
, ['type', 'min', 'max', 'value', 'id'], ['range', '0', '47', '35', 'eTimeIn']
, e.time[0], renderHook);
let eTimeIn = document.getElementById("eTimeIn");

const eTimeText = document.getElementById('eTime');
eTimeText.textContent = e.time[eTimeIn.value];
eTimeIn.oninput = () => {
    myTimeHelper.render(eTimeText, e.time[eTimeIn.value]);
    //p
    if (parseInt(eTimeIn.value, 10) - 6 < 0) {
        myTimeHelper.render(pTimeText, p.time[parseInt(eTimeIn.value, 10) + e.time.length - 6]);
        pTimeIn.value=parseInt(eTimeIn.value, 10) + e.time.length - 6;    
    } else {
        myTimeHelper.render(pTimeText, p.time[parseInt(eTimeIn.value, 10) - 6]);
        pTimeIn.value=parseInt(eTimeIn.value, 10) - 6;    
    }
    //m
    if (parseInt(eTimeIn.value, 10) - 4 < 0) {
        myTimeHelper.render(mTimeText, m.time[parseInt(eTimeIn.value, 10) + e.time.length - 4]);
        mTimeIn.value=parseInt(eTimeIn.value, 10) + e.time.length - 4;    
    } else {
        myTimeHelper.render(mTimeText, m.time[parseInt(eTimeIn.value, 10) - 4]);
        mTimeIn.value=parseInt(eTimeIn.value, 10) - 4;    
    }
    //c
    if (parseInt(eTimeIn.value, 10) - 2 < 0) {
        myTimeHelper.render(cTimeText, c.time[parseInt(eTimeIn.value, 10) + e.time.length - 2]);
        cTimeIn.value=parseInt(eTimeIn.value, 10) + e.time.length - 2;    
    } else {
        myTimeHelper.render(cTimeText, c.time[parseInt(eTimeIn.value, 10) - 2]);
        cTimeIn.value=parseInt(eTimeIn.value, 10) - 2;    
    }
}

myRenderHelper.render("br", [], [], [], " ", renderHook);

