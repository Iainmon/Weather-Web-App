//hi hello
var weather = null;
var error = null;
var Place = null;

function printWeather(place, CorF) {

    var Place = place;
    //deleting "beta Tag"
    document.getElementById("beta").innerHTML = '';

    //setting up API
    var json = 'https://api.apixu.com/v1/current.json?key=39247fa6db6a42f0b8323903172710&q=' + place;
    var myAPI = new XMLHttpRequest();
    myAPI.open("GET", json, false);
    myAPI.send(null);
    var dat = JSON.parse(myAPI.response);

        try {
            var error = dat.error.code;
            errorPage();
        } catch(err) {

            //setup button
            document.getElementById("CorFDiv").innerHTML = '<button id="CorFButton" type="button" onclick="CorF" class="btn btn-warning"></button>';
            document.getElementById("CorFButton").innerHTML = 'Celsius';
            document.getElementById( "CorFButton" ).setAttribute( "onClick", "printWeather(" + "'" + 'C' + "'" + ");" );

            if (CorF == 'C') {
                //sets prefference to celsius
                document.getElementById("CorFDiv").innerHTML = '<button id="CorFButton" type="button" onclick="CorF" class="btn btn-warning"></button>';
                document.getElementById("CorFButton").innerHTML = 'Fahrenheit';
                document.getElementById( "CorFButton" ).setAttribute( "onClick", "printWeather(" + "'" + place + "'" + ", '" + 'F' + "'" + ");" );
                var temp = dat.current.temp_c;
                var feelsLike = dat.current.feelslike_c;
                var CorF = 'Celsius'
                /*
                document.getElementById("CorFButton").innerHTML = 'Fahrenheit';
                document.getElementById("CorFButton").onclick = "CorF('F');";
                createPage(place, temp, weather, feelsLike, humid, type);
                Debug('C');*/
            } else if (CorF == 'F') {
                //sets prefference to ferenhight
                document.getElementById("CorFDiv").innerHTML = '<button id="CorFButton" type="button" onclick="CorF" class="btn btn-warning"></button>';
                document.getElementById("CorFButton").innerHTML = 'Celsius';
                document.getElementById( "CorFButton" ).setAttribute( "onClick", "printWeather(" + "'" + place + "'" + ", '" + 'C' + "'" + ");" );
                var temp = dat.current.temp_f;
                var feelsLike = dat.current.feelslike_f;
                var CorF = 'Fahrenheit';
                /*document.getElementById("CorFButton").innerHTML = 'Celsius';
                document.getElementById("CorFButton").onclick = "CorF('C');";
                createPage(place, temp, weather, feelsLike, humid, type);
                Debug('F');*/
            }



            //setup data
            var humid = dat.current.humidity;
            var Place = dat.location.name;
            var weather = dat.current.condition.text;
            var day = dat.current.is_day;
            var weather = weather.toLocaleLowerCase();
            //
            if (weather == null) {
                errorPage();
            } else {

                //setup icon
                if (day == 1) {
                    var icon = 'Icons/svg/' + weather + '.svg';
                } else if (day == 0) {
                    var icon = 'Icons/svg/NIGHT/' + weather + '.svg';
                }


                //writing HTML
                document.getElementById("body").innerHTML = '<img style="width:200px;height:200px;" src="' + icon + '">' + '<h1>The weather in ' + Place + ' is currently ' + weather + '. The tempreture is ' + temp + '° ' + CorF + ', but feels like ' + feelsLike + '° ' + CorF + ', because of the ' + humid + '% humidity.</h1>' +
                    '<button type="button" class="btn btn-default" onclick="location.reload(true);">Back</button>';
            }
        }
}

function otherPlace() {
    var localPlace = document.getElementById('otherPlace').value;
    printWeather(localPlace, 'F');
}



function getLocation() {
    document.getElementById('body').innerHTML = '<img src="loading.gif">';
    var x = document.getElementById("demo");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser. Please refresh the page.";
    }
}

function showPosition(position) {
    var localPlace = position.coords.latitude + ',' + position.coords.longitude;
    printWeather(localPlace, 'F');
}

//------------------------------FUNCTIONS-------------------------------------------

document.getElementById("otherPlace")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("findButton").click();
        }
    });

function errorPage() {
    document.getElementById("CorFDiv").innerHTML = '';
    document.getElementById("body").innerHTML = '<img style="width:200px;height:200px;" src="Icons/svg/warning.svg"><h1>Oops! Something went wrong!</h1> <h4>There is no data for this location.</h4> <button type="button" class="btn btn-default" onclick="location.reload(true);">Refresh Page</button>';
    document.getElementById("CorFDiv").innerHTML = '';
}

function Debug(print) {
    document.getElementById("debug").innerHTML = print;
}

function delay(mili) {
    setTimeout(delayfunc, mili);
}
function delayfunc() {
    document.getElementById("body").innerHTML = '<img style="width:200px;height:200px;" src="loading.gif"><h1>Loading...</h1>';
}
/*
$("html").on("contextmenu",function(e){
    return false;
});
*/
