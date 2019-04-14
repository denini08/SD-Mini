const express = require('express');
const routes = express.Router();

const PdfC = require('./controllers/PdfController');
let Bal = require('./models/Balancer');


class RoutesPdf{
    constructor(){
        this.PdfController = new PdfC;
        this.inicializarRotas();
        this.routes = routes;
        this.Balancer = new Bal();
    }

    inicializarRotas(){
        routes.get('/products', this.PdfController.index);
        routes.post('/products', this.PdfController.store);
        routes.get('/products/:id', this.PdfController.show);
        routes.put('/products/:id', this.PdfController.update);
        routes.delete('/products/:id', this.PdfController.destroy);
        
        routes.get('/index', (req,res) =>{
            res.render('index', { title: 'Express' });
        });
        
        routes.get('/busca', this.PdfController.findByQuery) ;   
        
        routes.get('/inserir', this.PdfController.inserir) ;   
        routes.post('/inserir', (req,res) =>{
            this.PdfController.inserirPost(req,res,this.Balancer);
        });
    }
}


module.exports = RoutesPdf;