const express = require('express');

const app = express();
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('Example app listening on port port!'));