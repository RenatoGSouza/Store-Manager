const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/products', router.products);
app.use('/sales', router.sales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('O pai ta on!'));