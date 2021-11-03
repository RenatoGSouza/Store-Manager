# Store Manager :computer:

###### O Store Manager é projeto da Trybe
---
# Sumário

- [O que é](#o-que-é)
- [Documentação](#documentação)
- [Instalação](#instalação)

### O que é
O Store Manager é uma API de acesso ao banco de dados NOSQL com Mongodb, onde podemos inserir, listar, atualizar e deletar, tanto para tabela de produtos quanto para a tabela de vendas.

### Documentação

**ATENÇÃO**
O `:id` na url é o id do referente ao `products` ou `sales`.

- **Products**

```bash
GET 'url/products'
```
Retorna a lista de todos os produtos cadastrados.

---
```bash
POST 'url/products'
```
Cadastra um produto.
  - API espera que seja enviado um `request body` no seguinte formato `json`.
```json
{
  "name": "product_name", // string
  "quantity": "product_quantity" // number
}
```
Todos os campos são obrigatórios e devem estar no formato correto.

---
```bash
GET 'url/products/:id'
```
Retorna o produto com o id correspondente cadastrado.

```bash
PUT 'url/products/:id'
```
Atualiza o produto com o id correspondente cadastrado.
  - API espera que seja enviado um `request body` no seguinte formato `json`.
```json
{
  "name": "product_name", // string
  "quantity": "product_quantity" // number
}
```
Todos os campos são obrigatórios e devem estar no formato correto.

---
```bash
DELETE 'url/products/:id'
```
Remove o produto com o id correspondente cadastrado.

---

- **Sales**

```bash
GET 'url/sales'
```
Retorna a lista de todos os produtos cadastrados.

---
```bash
POST 'url/sales'
```
Cadastra um produto.
  - API espera que seja enviado um `request body` no seguinte formato `json`.
```json
[
  {
  "productId": "product_id", // string
  "quantity": "product_quantity", // number
  },
  ...
]
```
Todos os campos são obrigatórios e devem estar no formato correto.

---
```bash
GET 'url/sales/:id'
```
Retorna o produto com o id correspondente cadastrado.

---
```bash
PUT 'url/sales/:id'
```
Atualiza o produto com o id correspondente cadastrado.
  - API espera que seja enviado um `request body` no seguinte formato `json`.
```json
[
  {
  "productId": "product_id", // string
  "quantity": "product_quantity", // number
  },
  ...
]
```
Todos os campos são obrigatórios e devem estar no formato correto.

---
```bash
DELETE 'url/sales/:id'
```
Remove o produto com o id correspondente cadastrado.

---

### Instalação

Clone o repositório
**Chave SSH**
```bash
git clone git@github.com:RenatoGSouza/Store-Manager.git
```
**Chave HTTPS**
```bash
git clone https://github.com/RenatoGSouza/Store-Manager.git
```

entre na pasta
```bash
cd Store-Manager/
```

instale as dependencias
```bash
npm install
```

e inicie a aplicação
```bash
npm start
```

sua aplicação irá iniciar no seu ambiente local, e sua url de acesso será
```bash
http://localhost:3000/
```

Espero que se divita com essa API.
