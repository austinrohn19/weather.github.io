$(document).ready(function(){
    let apiKey = "a08a0503221ea7a19c8ab0aede9a437e";
$('#search-button').on('click', function(){
    let userInput = $("#search-value").val();

    console.log(userInput);

    getCurrentWeather(userInput)


})



function getCurrentWeather(userInput) {
console.log("USER INPUT INSIDE GET WEATHER ",userInput)

let apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + apiKey + "&units=imperial";

$.ajax({
    type: "GET",
    url: apiURL,
    dataType: 'JSON'
}).then(function(response){
    $('#current-weather').empty()
console.log(response.main)
let title = $('<h3>').addClass("card-title").text(response.name)
let card = $("<div>").addClass('card');
let temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + "F" )

let cardBody = $("<div>").addClass("card-body");

cardBody.append(title, temp)
card.append(cardBody)

$("#current-weather").append(card);







})



}








})