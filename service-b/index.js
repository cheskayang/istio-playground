const express = require('express')

const PORT = process.env.PORT || 8082;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/liveness_check', async (req, res) => {
  res.status(200).send();
})

app.get('/readiness_check', async (req, res) => {
  res.status(200).send();
})

app.get('/entity', async (req, res) => {
  console.log('hit /entity, version:', process.env.VERSION)
  if (Math.random() < 0.5) {
    console.log('ok');
    res.status(200).send({res: "this is it"});
  } else {
    console.log('wrong')
    res.status(502).send();
  }
})

const server = app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

