exports.world = function() {
  console.log('Hello World');
}

const express = require('express')
const app = express()

app.get('/', (req, res) => res.send("I'm DotDiddy"))

app.listen(3030, () => console.log('Example app listening on port 3030!'))

