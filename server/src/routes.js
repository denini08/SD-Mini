const express = require('express');
const routes = express.Router();

const PdfController = require('./controllers/PdfController');

routes.get('/products', PdfController.index);
routes.post('/products', PdfController.store);
routes.get('/products/:id', PdfController.show);
routes.put('/products/:id', PdfController.update);
routes.delete('/products/:id', PdfController.destroy);

routes.get('/index', (req,res) =>{
    res.render('index', { title: 'Express' });
});

routes.get('/busca', PdfController.findByQuery) ;   

routes.get('/inserir', PdfController.inserir) ;   
routes.post('/inserir', PdfController.inserirPost) ;


module.exports = routes;