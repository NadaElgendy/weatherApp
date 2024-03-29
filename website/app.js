/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// The Api URL
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// API Key for OpenWeatherMap API with celsius
const apiKey = ",&appid=8be7026531257334b3370c1db3daeecb&units=metric";

// the URL of the server to post data
const server = "http://localhost:1111";

// const getDate = async function () {
//     const request = await fetch('')
//     try{

//     } catch(err){
//         console.log(err);
//     }
// }

// generateData //

const generateData = () => {
  //get value after click on the button
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  // getWeatherData return promise
  getWeatherData(zip).then(data => {
    //making sure from the received data to execute rest of the steps
    if (data) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }]
      } = data;

      const info = {
        newDate,
        temp: Math.round(temp), // to get integer number
        feelings
      };

      postData(server + "/add", info);

      updatingUI();
      //   document.getElementById('entry').style.opacity = 1;
    }
  });
};

// Function called by event listener
document.getElementById("generate").addEventListener("click", generateData);

//Function to GET Web API Data
const getWeatherData = async zip => {
  try {
    const res = await fetch(baseURL + zip + apiKey);
    const data = await res.json();

    if (data.cod != 200) {
      // display the error message on UI
      error.innerHTML = data.message;
      setTimeout(_ => (error.innerHTML = ""), 2000);
      throw `${data.message}`;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Function to POST data
const postData = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(info)
  });

  try {
    const newData = await res.json();
    console.log(`You just saved`, newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

//Function to GET Project Data
// and updating UI by this data
const updatingUI = async () => {
  const res = await fetch(server + "/all");
  try {
    const savedData = await res.json();

    document.getElementById("date").innerHTML = savedData.newDate;
    document.getElementById("temp").innerHTML = savedData.temp + "&degC";
    document.getElementById("content").innerHTML = savedData.feelings;
  } catch (error) {
    console.log(error);
  }
};
