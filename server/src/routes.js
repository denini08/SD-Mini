const express = require('express');
const routes = express.Router();

const PdfController = require('./controllers/PdfController');

routes.get('/products', PdfController.index);
routes.post('/products', PdfController.store);
routes.get('/products/:id', PdfController.show);
routes.put('/products/:id', PdfController.update);
routes.delete('/products/:id', PdfController.destroy);

module.exports = routes;