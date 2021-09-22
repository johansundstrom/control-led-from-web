# Control-LED-from-WEB

## Installera Express

* Installera 
* Etablera en projektyta i filsystemet
* 

## HTML-boilerplate - Client side

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```

* inom ```<body>```
  
```html
<div id="center">
  <input type="button" onclick="postData()" id="button" class="css_off" value="LED Off">
</div>
```

Observera alternativet till att anropa ```... onclick="postData()"...````

```javascript
button.addEventListener('click', postData);
```

* Ge knappen stil

* https://www.css3buttongenerator.com 

* Addera CSS i ```<head>```

```html
<style>
  #button {
    border-radius: 28px;
    font-size: 16px;
    padding: 16px 32px;
  }
  #center {
    text-align: center;
  }
  .css_on {
    background-color: green;
    color: white;
  }
  .css_off {
    background-color: red;
    color: black;
  }
</style>
```

* Undersök uppbyggnaden i DOM - https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
* Konsolen ```document.querySelector('#button')```
* Konsolen ```myButton = document.querySelector('#button')```
* Konsolen ```myBytton```
* Undersök speciellt classList - https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
* ```classList``` har metoderna ```add(), remove(), replace(), och toggle()```
* Lägg till script längst ned i ```<body>```
* Prova t.ex. att sända ```button.classList.remove('css_off')``` i konsolen

```html
<script>
  function postData(){
    const myButton = document.querySelector("#button")

    if (button.classList.contains('css_off')) {
      myButton.classList.remove('css_off');
      button.classList.add('css_on');
      button.innerHTML = 'LED ON';
    } else {
      button.classList.remove('css_on');
      button.classList.add('css_off');
      button.innerHTML = 'LED OFF';
    }
  }
</script>
```

* Testa att klicka på knappen

Lärdom - HTML bolerplate. CSS manipulerar HTML's inbyggda stil. Med Javascript kan DOM manipuleras. Javascript 

## Node - Server side

* Installera Node LTS - https://nodejs.org/en/
* Skapa en webbserver - http://expressjs.com/en/starter/installing.html

```javascript
//setup
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//definiera inkommande JSON data
const options = {
  limit: '10kb', 
  type: 'application/json'
};
app.use(express.json(options));

//serve static assets from 'public'
app.use(express.static('public'));

//Routes HTTP POST requests to the specified path och callback
app.post('/api', (request, response) => {
  const data = request.body;
  console.log(data);

  //Make epoch time
  let serverEpoch = new Date().getTime();

  //Sends a JSON response
  response.json({
    state: data.state,
    roundTrip: serverEpoch - data.clientEpoch + 'mS'
  });
});

//Binds and listens for connections on the specified host and port
app.listen(port, function() {
 console.log('Open: http://localhost:' + port);
});
```

## Publicera på Heroku

* logga in på heroku ```heroku login```
* skapa plats på heroku ```heroku create```
* flytta upp till heroku ```git push heroku main```
* se resultat ```heroku open```
