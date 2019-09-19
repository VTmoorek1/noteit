const express = require('express');
const port = 3000;

const app = express();

app.get ('/', (req,res) => {
    res.end('Hi on port ' + port);
});

app.listen(port, () => {
    console.log('Listening to port ' + port);
});
