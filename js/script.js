$(document).ready(function () {

    console.log("hello");

    weatherApp = {
        $target: $("#weather"),
        weatherApiKey: "",
        localStorageKey: "openWeatherApi",

        getFormData: function () {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                weatherApp.weatherApiKey = $("#apikey").val().trim();
                weatherApp.saveApiKey();
            }

            var zip = $("#zip").val().trim();
            if (zip === null || zip.length < 5) {
                weatherApp.$target.html("Enter a valid zip code.");
            } else {
                weatherApp.getWeatherData(zip);
            }

            console.log(apikey);
            console.log(zip);
        },

        getWeatherData: function (zipcode) {
            var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

            $.getJSON(url, function (data) {
                if (data.cod === 200) {
                    weatherApp.$target.html("Success!");
                    weatherDesc = data.weather[0].description;
                    weatherApp.$target.append('<p>' + "Description:  " +  weatherDesc + '</p>'); 
                    weatherTemp = data.main.temp;
                    weatherApp.$target.append('<p>' + "Temperature:  " +  weatherTemp + " F" +'</p>'); 
                    console.log(weatherDesc);
                } else {
                    weatherApp.$target.html("Sorry, no weather data available. Try again later.");
                }
            }).fail(function () {

            });
        },


        loadApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$target.html("Sorry, local storage is not supported for this browser.");
            } else {
                //Get API Key
                weatherApp.weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    //weatherApp.$target.html("Sorry, no api key was found.");
                    return false;
                }
                return true;
            }
        },
        saveApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$target.html("Sorry, local storage is not supported for this browser.");
            } else {
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    weatherApp.$target.html("Sorry, no api key was found.");
                } else {
                    localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                    $("#apidiv").attr("class", "hide");
                }
            }
        },


    }

    // Form submit handler
    $("#submit").click(function () {
        weatherApp.getFormData();

        return false;
    });

    if (weatherApp.loadApiKey()) {
        $("#apidiv").attr("class", "hide");
    }

});