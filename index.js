//setup
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//definiera inkommande JSON data
const options = {
  limit: '10kb', 
  type: 'application/json'
};
app.use(express.json(options));   //http://expressjs.com/en/api.html#express.json

//serve static assets from 'public' as root 
app.use(express.static('public'));  //http://expressjs.com/en/api.html#express.static

//Routes HTTP POST requests to the specified path och callback
app.post('/api', (request, response) => {
  const data = request.body;
  console.log(data);

  //Make epoch time
  let serverEpoch = new Date().getTime();

  //Make and send JSON response to client
  const res = { 
    state: data.state,
    roundTrip: serverEpoch - data.clientEpoch + 'mS'
  }
  response.json(res);
});

//Binds and listens for connections on the specified host and port
app.listen(port, function() {
 console.log(`Listening on http://localhost:${port}`);
});
