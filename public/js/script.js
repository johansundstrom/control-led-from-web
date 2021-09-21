"use strict";   //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

let myData = { state: 'OFF' };
let host;

async function postData() {

  const button = document.querySelector("#button");

  if (location.host == 'cryptic-meadow-42908.herokuapp.com') {
    host = 'Region: United States'
  } else {
    host = 'Localhost';
  }

  button.classList.remove('css_off', 'css_on');
  button.classList.add('css_wait');
  button.innerHTML = 'WAIT';

  //   datalast
  if (myData.state == 'OFF') {
    myData = { state: 'ON' };
  } else {
    myData = { state: 'OFF' };
  }

  let epoch = new Date().getTime();
  myData.clientEpoch = epoch;
  //   /datalast

  //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(myData)
  }

  const response = await fetch('/api', options);
  const jsonData = await response.json();

  //template literals - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  document.getElementById('info').innerText = `Clicked element updated after ${jsonData.roundTripInMilliSec}mS roundtrip from ${host}`;

  console.log(jsonData);

  if (jsonData.state == 'ON') {
    button.classList.remove('css_wait');
    button.classList.add('css_on');
    button.innerHTML = 'LED ON';
  } else {
    button.classList.remove('css_wait');
    button.classList.add('css_off');
    button.innerHTML = 'LED OFF';
  }
}