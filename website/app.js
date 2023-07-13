/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "42332124f121f31bc1e914173609be4d335a01c&units=metric";

// add an event listener
document.getElementById('generate').addEventListener('click', performAction);


// call the api
const getWeather = async (baseURL, apiKey, zipCode) => {
    const res = await fetch(baseURL + zipCode + "&appid=" + apiKey);
    try {
        const data = await res.json();
        return data;

    } catch (error) {
        console.log('error', error);
    }
}


// function to call the api and add the data
function performAction(){
    const zipCode = document.getElementById("zip").value;
    getWeather(baseURL, apiKey, zipCode)
        .then(async function (data) {
            const userFeelings = document.getElementById('feelings').value;
            const newData = {
                temperature: data.main.temp,
                date: newDate,
                userResponse: userFeelings
            }
            postData('/addPost', newData);
            updateUI();
        })
}


// function to post the data to the server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {

        const weatherData = await response.json();     
        return weatherData;

    } catch (error) {
        console.log('error', error);
    }
}

// function to update the UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData.latest.date;
        document.getElementById('temp').innerHTML = allData.latest.temperature;
        document.getElementById('content').innerHTML = allData.latest.userResponse;
    } catch (error) {
        console.log('error', error);
    }
}









