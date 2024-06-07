const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log("Server is running on port 3000")
  console.log("https://localhost:3000")
})

app.get('/api/quotes/random', (req, res, next) => {
  const data = getRandomElement(quotes);
  console.log(data)
  const response = {
    quote: data
};
  res.send(response)
})

app.get('/api/quotes', (req, res) => {
  if (req.query.person !== undefined) {
    const quotesByPerson = quotes.filter(quote => quote.person === req.query.person);
    res.send({
      quotes: quotesByPerson
    });
  } else {
    res.send({
      quotes: quotes
    });
  }
});

app.post('/api/quotes', (req, res) => {
  const newQuote = {
    quote: req.query.quote,
    person: req.query.person,
  }

  if(newQuote.quote && newQuote.person){
    quotes.push(newQuote);
    res.send({
      quote: newQuote
    })
  } else {
    res.status(400).send()
  }
})

