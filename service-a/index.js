const express = require('express')
const axios = require('axios').default;

const PORT = process.env.PORT || 8081;

const SERIVCE_B_HOST = process.env.SERIVCE_B_HOST || "localhost:8082"

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/liveness_check', async (req, res) => {
  res.status(200).send();
})

app.get('/readiness_check', async (req, res) => {
  res.status(200).send();
})

app.get('/service-b/entity', async (req, res) => {
  console.log("hit /serivce-b/entity")
  try {
    const result = await axios.get(`http://${SERIVCE_B_HOST}/entity`);
    res.status(200).send(result.data)
  } catch(e) {
    console.log('caught error')
    res.status(500).send(e.message)
  }
  return
})

const server = app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

