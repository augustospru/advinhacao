var express     = require('express')
var app         = express();
var bodyParser  = require('body-parser');
const cors = require('cors');
const db = require('./database')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors({
  origin: '*'
}));

app.get('/palavra', async (_, res) => {
  const result = await db.getOneRandom();
  res.status(200).json(result);
})

app.get('/lista', async (_, res) => {
  const results = await db.getAll();
  res.status(200).json(results);
})

app.post('/add', async (req, res) => {
  console.log(req.body);
  const word = {word: req.body.word, hint: req.body.hint}
  await db.insertOne(word);
  res.status(200).json(word);
})

app.post('/remove', async (req, res) => {
  console.log(req.body);
  const word = await db.deleteOne(req.body.id);
  res.status(200).json(word);
})

app.get(/^(.+)$/, function (req, res) {
  try {
    res.status(404).write("Not found")
    res.end();
  }
  catch(e)
  {
    res.end();
  }    
})

app.listen(10000, function(){
  console.log('SERVIDOR WEB na porta 10000');
});


