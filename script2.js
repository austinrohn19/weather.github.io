$(document).ready(function () {
    let apiKey = "a08a0503221ea7a19c8ab0aede9a437e";
    $('#search-button').on('click', function () {
        let userInput = $("#search-value").val();

        console.log(userInput);

        getCurrentWeather(userInput)

        fivedayforcast(userInput)
    })



    function getCurrentWeather(userInput) {
        console.log("USER INPUT INSIDE GET WEATHER ", userInput)

        let apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + apiKey + "&units=imperial";

        $.ajax({
            type: "GET",
            url: apiURL,
            dataType: 'JSON'
        }).then(function (response) {
            $('#current-weather').empty()
            console.log(response)

            let coord = {
                lat: response.coord.lat,
                lon: response.coord.lon
            }

            getUVIndex(coord)

            let title = $('<h3>').addClass("card-title").text(response.name)
            let card = $("<div>").addClass('card');
            let temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + "F")
            let wind = $("<p>").addClass("card-text").text("Wind: " + response.wind.speed + "mph")
            let Humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%")
            let icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
            let Description = $("<p>").addClass("card-text").text(response.weather[0].description)
            let cardBody = $("<div>").addClass("card-body");

            cardBody.append(title, icon, Description, temp, wind, Humidity)
            card.append(cardBody)

            $("#current-weather").append(card);

        })

    }

    function getUVIndex(coord) {

        console.log("GET COORDINATES IN GETUV INDEX", coord)
        let apiURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + coord.lat + "&lon=" + coord.lon + "&appid=" + apiKey;

        $.ajax({
            type: "GET",
            url: apiURL,
            dataType: 'JSON'
        }).then(function (response) {
            console.log(response)
            let uvIndex = $("<p>").addClass("card-text btn btn-sm").text("UV Index: " + response.value)
            $("#current-weather .card-body").append(uvIndex)

            if (response.value < 3) {
                uvIndex.addClass("btn-success")
            }
            else if (response.value < 7) {
                uvIndex.addClass("btn-warning")
            }
            else { uvIndex.addClass("btn-danger") }
        })
    }

    function fivedayforcast(userInput) {

        let apiURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + apiKey + "&units=imperial";

        $.ajax({
            type: "GET",
            url: apiURL,
            dataType: 'JSON'
        }).then(function (response) {
            $('#future-forecast').empty()
            console.log("FIVE DAY FORCAST", response)

            for (let i = 0; i < response.list.length; i++) {

                if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {

                    let column = $("<div>").addClass("col-md-2")
                    let card = $("<div>").addClass("card")
                    let cardBody = $("<div>").addClass("card-body")
                    let date = $("<p>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString())
                    let icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png")
                    let temp = $("<p>").addClass("card-text").text("Temperature: " + response.list[i].main.temp + "F")
                    let Humidity = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity + "%")
                    let Description = $("<p>").addClass("card-text").text(response.list[i].weather[0].description);

                    column.append(card)
                    cardBody.append(date, icon, Description, temp, Humidity)
                    card.append(cardBody)

                    $("#future-forecast").append(column);

                }

            }
        });
    }
})