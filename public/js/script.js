async function postData(){

  let myData = {}; 
  const button = document.querySelector("#button");

  if (button.classList.contains('css_off')) {
    myData = { state: 'ON' };
  } else {
    myData = { state: 'OFF' };
  }
    
  let epoch = new Date().getTime();
  myData.clientEpoch = epoch;

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(myData)
  }

  const response = await fetch('/api', options);
  const jsonData = await response.json();
  console.log(jsonData);

  if (button.classList.contains('css_off')) {
    button.classList.remove('css_off');
    button.classList.add('css_on');
    button.innerHTML = 'LED ON';
  } else {
    button.classList.remove('css_on');
    button.classList.add('css_off');
    button.innerHTML = 'LED OFF';
  }
}
