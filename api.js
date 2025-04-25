window.onload = function(){
var output = document.getElementById("output");
var loc = document.getElementById("location");
var temp = document.getElementById("temperature");
var cond = document.getElementById("conditions");
var icon = document.getElementById("icon");
var err = document.getElementById("error");
var humi = document.getElementById("humidity");

// My api key = 325c8f4de3fb08c0f5dcc98c672aa156;

function getCityWeather(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",CA&appid=325c8f4de3fb08c0f5dcc98c672aa156&units=metric";
    getWeather(url);
}

function getWeather(url){
    var xhr = new XMLHttpRequest();  // Using XMLHttpRequest to retrive API data.
    xhr.open('GET',url,true);
    xhr.responseType = "json";  // respone in formatted JSON
    xhr.send(null);
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var data = xhr.response;  // JSON object
                console.log(data);        // getting data in console
                dispayWeather(data); 

            }else{
                showError("Weather data is not available");
            }
        }
    }
}
 
// function to display the data
function dispayWeather(data){
    err.innerHTML = "";
    output.style.display = "block";
    loc.innerHTML = data.name;
    temp.innerHTML = data.main.temp + "°C 🌡️";
    cond.innerHTML = data.weather[0].description;
    var iconCode = data.weather[0].icon;
    var altText = data.weather[0].description;
  // Use image + dynamic alt 
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${altText}">`;
    humi.innerHTML = data.main.humidity + "%💧";
}
// funstion to display error.
function showError(message) {
    output.style.display = "block";
    err.textContent = message;
    loc.textContent = "";
    temp.textContent = "";
    cond.textContent = "";
    icon.innerHTML = "";
    humi.textContent = "";
}

//  event listeners for buttons
document.getElementById("Toronto").addEventListener("click", function () {
    getCityWeather("Toronto");
});

document.getElementById("Barrie").addEventListener("click", function () {
    getCityWeather("Barrie");
});
};




