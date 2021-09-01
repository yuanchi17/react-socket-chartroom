const express = require('express')
const cors = require('cors')

const app = express()

app.get("/", (req, res) => {
  console.log('Welcome')
  res.send('<h1>Express</h1>')
});


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server start: ${PORT}`)
})