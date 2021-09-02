const cors = require('cors')
const path = require('path')

const express = require('express')
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

app.get("/api/getText", cors(), async (req, res, next) => {
  try {
    console.log('Welcome')
    res.json({ text: 'Express' })
  } catch(err){
    next(err)
  }
});

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server start: ${PORT}`)
})