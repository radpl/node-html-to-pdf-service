const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT;
app.use(cors());


app.get('/products/:id', (req, res) => {
  res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.listen(port, () => {
  console.log('Server is up on port ', port);
});