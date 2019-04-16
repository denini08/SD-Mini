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
        routes.get('/index', (req,res) =>{
            res.render('index', { title: 'Express' });
        });
        
        routes.get('/busca', (req,res) =>{
            this.PdfController.findByQuery(req.query.b).then((result) =>{
                res.render('resultadosBusca', { 'retorno': result,
                'string': req.query.b});
            }).catch((err) =>{
                console.log('erro1213123', err);
                res.json(err);
            })
        });
        
        routes.get('/inserir', (req,res) =>{
            res.render('inserir'); 
        });

        routes.get('/getPdf/:id', (req,res) =>{
            this.PdfController.getPdf(req.params.id).then((pdfUrl) =>{
                res.status(200).json(pdfUrl)
            }).catch((err) =>{
                console.log('erro3' , err);
                res.status(400).json(err);
            })
        })

        routes.post('/inserir', (req,res) =>{
            this.PdfController.inserirPost(req,this.Balancer).then((succ) =>{
                res.render('index', { title: 'Express' });           
            }).catch((err)=>{
                res.json(err);
            })
        });


        routes.get('/delete/:id',(req,res) =>{
            this.PdfController.deletarPdf(req.params.id).then((succ) =>{
                res.render('index', { title: 'Express' });           
            }).catch((err) =>{
                res.json(err);
            })
        })
    }
}


module.exports = RoutesPdf;