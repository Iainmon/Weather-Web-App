var json = 'https://api.apixu.com/v1/current.json?key=39247fa6db6a42f0b8323903172710&q=';
var feelsLike = null;
var humid = null;
var weather = null;
var temp = null;
var feelsLike = null;
var tempf = null;
var feelsLikef = null;
var tempc = null;
var feelsLikec = null;
var place = null;

function getInfo(place, CorF) {
    json = json + place;
    //Pices together JSON File
    var myAPI = new XMLHttpRequest();
    myAPI.open("GET", json, false);
    myAPI.send(null);

    // setting dot operatorx
    var dat = JSON.parse(myAPI.response);

    // sets up both temp type data types

    var tempf = dat.current.temp_f;
    var feelsLikef = dat.current.feelslike_f;
    var tempc = dat.current.temp_c;
    var feelsLikec = dat.current.feelslike_c;

//CorF(' + "'" + 'C' + "'" + ')
    document.getElementById("CorFDiv").innerHTML = '<button id="CorFButton" type="button" onclick="" class="btn btn-warning"></button>';
    document.getElementById("CorFButton").innerHTML = 'Celsius';
    document.getElementById( "CorFButton" ).setAttribute( "onClick", "CorF(" + "'" + 'C' + "'" + ")" );

    //setting the rest of the variables
    var feelsLike = dat.current.feelslike_f;
    var humid = dat.current.humidity;
    var weather = weather.toLocaleLowerCase();
    createPage(place, tempf, weather, feelsLikef, humid, 'Fahrenheit');
}

//creating page command
function createPage(place, temp, weather, feelsLike, humid, CorF) {

    var icon = 'Icons/svg/' + weather + '.svg';

    document.getElementById("body").innerHTML = '<img style="width:200px;height:200px;" src="' + icon + '">' + '<h1>The weather in ' + place + ' is currently ' + weather + '. The tempreture is ' + temp + '° ' + CorF + ', but feels like ' + feelsLike + '° ' + CorF + ', because of the ' + humid + '% humidity.</h1>' +
    '<button type="button" class="btn btn-default" onclick="location.reload(true);">Back</button>';
}

function CorF(type) {
    json = json + place;
    //Pices together JSON File
    var myAPI = new XMLHttpRequest();
    myAPI.open("GET", json, false);
    myAPI.send(null);

    // setting dot operatorx
    var dat = JSON.parse(myAPI.response);
    //setting up vars needed
    var tempf = dat.current.temp_f;
    var feelsLikef = dat.current.feelslike_f;
    var tempc = dat.current.temp_c;
    var feelsLikec = dat.current.feelslike_c;
    var humid = dat.current.humidity;
    var weather = dat.current.condition.text;
    var weather = weather.toLocaleLowerCase();



    Debug('Fired');
    if (type == 'C') {
        document.getElementById("CorFButton").innerHTML = 'Fahrenheit';
        document.getElementById("CorFButton").onclick = CorF('F');
        createPage(place, tempc, weather, feelsLikec, humid, 'Celsius');
        Debug('C');
    } else if (type == 'F') {
        document.getElementById("CorFButton").innerHTML = 'Celsius';
        document.getElementById("CorFButton").onclick = CorF('C');
        createPage(place, tempf, weather, feelsLikef, humid, 'Fahrenheit');
        Debug('F');
    }
}

function Debug(print) {
    document.getElementById("debug").innerHTML = print;
}

/*
$("html").on("contextmenu",function(e){
    return false;
});
*/
function iconSet() {
}
