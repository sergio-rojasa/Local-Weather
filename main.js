var createScript = function(url) {
    var script = document.createElement('script');
    script.src = url;

    document.body.appendChild(script);
}
var getLocation = function() {
    var url = "http://www.ipinfo.io?callback=parseLocation";
    createScript(url);
}

var parseLocation = function(data) {
    var city    = document.getElementById("city");
    var region  = document.getElementById("region");

    var currentCity    = data.city;
    var currentRegion  = data.region;
    var currentCountry = data.country; 
    var currentPostal  = data.postal;

    city.innerHTML   = currentCity;
    region.innerHTML = currentRegion;

    getWeather(currentCountry, currentPostal);
}

var getWeather = function(country, postal) {

    var key = "030724c2b77f38fe11cb418e3ab6fdc7";
    var baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
    var url = baseUrl+"zip="+postal+","+country+"&type=accurate&mode=json&units=imperial&appid="+key+"&callback=parseWeather";

    createScript(url);
}
var parseWeather = function(data) {
    console.log(data);

    var description = document.getElementById("description");
    var temperature = document.getElementById("temperature");
    var weatherImage = document.getElementById("weather-image");
    var img = document.createElement('img');
    img.setAttribute('id', 'weather');

    var currentDescription = data.weather[0].description;
    var currentTemperature = Math.round(data.main.temp);
    var currentMainIcon    = data.weather[0].main;

    if(currentMainIcon === "Clear") {
      img.src = "http://image.flaticon.com/icons/svg/146/146519.svg";
    }
    else if(currentMainIcon === "Rain") {
      img.src = "http://image.flaticon.com/icons/svg/146/146525.svg";
    }
    else if(currentMainIcon === "Clouds") {
      img.src = "http://image.flaticon.com/icons/svg/146/146517.svg";
    }
    else if(currentMainIcon === "Snow") {
      img.src = "http://image.flaticon.com/icons/svg/146/146520.svg";
    }
    else if(currentMainIcon === "Storm") {
      img.src = "http://image.flaticon.com/icons/svg/146/146523.svg";
    }
    console.log(currentMainIcon);
    description.innerHTML = currentDescription; 
    temperature.innerHTML = currentTemperature;
    weatherImage.appendChild(img);
}
var fahrenheit = function() {
    var fahrenheitButton = document.getElementById("fahrenheit");
    var celsiusButton = document.getElementById("celsius");

    var temperature = document.getElementById("temperature");
    var currentTemperature = temperature.innerHTML;
    var fahrenheitTemperature = Math.round(currentTemperature*(9/5) + 32);

    fahrenheitButton.disabled = true;
    fahrenheitButton.style.backgroundColor = "#00a8ff";
    
    celsiusButton.disabled = false;
    celsiusButton.style.backgroundColor = "#cfcfcf";

    temperature.innerHTML = fahrenheitTemperature;
}
var celsius = function() {
    var celsiusButton = document.getElementById("celsius");
    var fahrenheitButton = document.getElementById("fahrenheit");

    var temperature = document.getElementById("temperature");
    var currentTemperature = document.getElementById("temperature").innerHTML;
    var celsiusTemperature = Math.round((currentTemperature-32) * (5/9));

    celsiusButton.disabled = true;
    celsiusButton.style.backgroundColor = "#00a8ff";

    fahrenheitButton.disabled = false;
    fahrenheitButton.style.backgroundColor = "#cfcfcf"; 

    temperature.innerHTML = celsiusTemperature;
}

