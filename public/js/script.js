async function postData(){

  let myData = {}; 
  const button = document.querySelector("#button");

  //   datalast
  if (button.classList.contains('css_off')) {
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
  
  console.log(jsonData);

  if (jsonData.state == 'ON') {
    button.classList.toggle('css_off');   
    button.classList.toggle('css_on');
    button.innerHTML = 'LED ON';
  } else {
    button.classList.remove('css_on');
    button.classList.add('css_off');
    button.innerHTML = 'LED OFF';
  }
}
