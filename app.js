let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let app = express();

let skierTerms = [
  {
    term: "Rip",
    defined: "To move at a high rate of speed"
  },
  {
    term: "Huck",
    defined: "To throw your body off of something, usually a natural feature like a cliff"
  },
  {
    term: "Chowder",
    defined: "Powder after it has been sufficiently skied"
  }
]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
  // logs the specific type of request for the url.
  console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
  next();
});

app.use(express.static('./public'));

app.use(cors());

app.get('/dictionary-api', (req, res) => {
  // res -> respond
  res.json(skierTerms);
});

app.post('/dictionary-api', (req, res) => {
  skierTerms.push(req.body);
  res.json(skierTerms);
})

app.delete('/dictionary-api/:term', (req, res) => {
  skierTerms = skierTerms.filter(definition => {
    return definition.term.toLowerCase() !== req.params.term.toLowerCase();
  })

  res.json(skierTerms);
})

app.listen(3000);

console.log('Express app running on port 3000');

module.exports = app;
