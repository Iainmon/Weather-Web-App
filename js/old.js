var json = 'https://api.apixu.com/v1/current.json?key=39247fa6db6a42f0b8323903172710&q=';
var Place = null;
var humid = null;
var weather = null;
var temp = null;
var feelsLike = null;


function getInfo(place, CorF) {

    //deleting "beta Tag"
    document.getElementById("beta").innerHTML = '';

    //setup api
    json = json + place;
    var myAPI = new XMLHttpRequest();
    myAPI.open("GET", json, false);
    myAPI.send(null);
    var dat = JSON.parse(myAPI.response);

    //setup button
    document.getElementById("CorFDiv").innerHTML = '<button id="CorFButton" type="button" onclick="CorF" class="btn btn-warning"></button>';
    document.getElementById("CorFButton").innerHTML = 'Celsius';
    document.getElementById( "CorFButton" ).setAttribute( "onClick", "CorF(" + "'" + 'C' + "'" + ");" );

    //setup other variables
    var temp = dat.current.temp_f;
    var feelsLike = dat.current.feelslike_f;
    var humid = dat.current.humidity;
    var weather = dat.current.condition.text;
    var weather = weather.toLocaleLowerCase();

    //creates page
    createPage(place, temp, weather, feelsLike, humid, 'Fahrenheit');

}

function createPage(place, temp, weather, feelsLike, humid, CorF) {
    var myAPI = new XMLHttpRequest();
    myAPI.open("GET", json, false);
    myAPI.send(null);
    var dat = JSON.parse(myAPI.response);

    var humid = dat.current.humidity;
    var Place = dat.location.name;
    var weather = dat.current.condition.text;
    var day = dat.current.is_day;
    var weather = weather.toLocaleLowerCase();

    Debug(day);
    if (place == null){
        errorPage();
    }
    if (CorF == 'F') {
        var temp = dat.current.temp_f;
        var feelsLike = dat.current.feelslike_f;
        var CorF = 'Fahrenheit';
    } else if (CorF == 'C') {
        var temp = dat.current.temp_c;
        var feelsLike = dat.current.feelslike_c;
        var CorF = 'Celsius'
    }


    //icon
    if (day == 1) {
        Debug('hi');
        var icon = 'Icons/svg/' + weather + '.svg';
    } else if (day == 0) {
        Debug('hi');
        var icon = 'Icons/svg/NIGHT/' + weather + '.svg';
    }



    //writing HTML
    document.getElementById("body").innerHTML = '<img style="width:200px;height:200px;" src="' + icon + '">' + '<h1>The weather in ' + Place + ' is currently ' + weather + '. The tempreture is ' + temp + '° ' + CorF + ', but feels like ' + feelsLike + '° ' + CorF + ', because of the ' + humid + '% humidity.</h1>' +
        '<button type="button" class="btn btn-default" onclick="location.reload(true);">Back</button>';
}

function CorF(type) {

    if (type == 'C') {
        document.getElementById("CorFDiv").innerHTML = '<button id="CorFButton" type="button" onclick="CorF" class="btn btn-warning"></button>';
        document.getElementById("CorFButton").innerHTML = 'Fahrenheit';
        document.getElementById( "CorFButton" ).setAttribute( "onClick", "CorF(" + "'" + 'F' + "'" + ");" );
        /*
        document.getElementById("CorFButton").innerHTML = 'Fahrenheit';
        document.getElementById("CorFButton").onclick = "CorF('F');";
        createPage(place, temp, weather, feelsLike, humid, type);
        Debug('C');*/
    } else if (type == 'F') {
        document.getElementById("CorFDiv").innerHTML = '<button id="CorFButton" type="button" onclick="CorF" class="btn btn-warning"></button>';
        document.getElementById("CorFButton").innerHTML = 'Celsius';
        document.getElementById( "CorFButton" ).setAttribute( "onClick", "CorF(" + "'" + 'C' + "'" + ");" );
        /*document.getElementById("CorFButton").innerHTML = 'Celsius';
        document.getElementById("CorFButton").onclick = "CorF('C');";
        createPage(place, temp, weather, feelsLike, humid, type);
        Debug('F');*/
    }

    createPage(Place, temp, weather, feelsLike, humid, type);
    //end
}

function errorPage() {
    document.getElementById("body").innerHTML = '<img style="width:200px;height:200px;" src="Icons/svg/warning.svg"><h1>Oops! There has been an error!</h1>' +
        '<button type="button" class="btn btn-default" onclick="location.reload(true);">Refresh Page</button>';
}


function Debug(print) {
    document.getElementById("debug").innerHTML = print;
}

$("html").on("contextmenu",function(e){
    return false;
});


