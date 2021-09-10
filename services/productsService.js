const valueIsBlank = (value) => (!value);
const code = 400;
const isValidProduct = (name, quantity) => {
  switch (true) {
    case (valueIsBlank(name)): return { err: { message: 'Dados inválidos', code } };
    case (valueIsBlank(quantity)): return { err: { message: 'Dados inválidos', code } };
    default:
      return true;
  }
};

module.exports = {
  isValidProduct,
};