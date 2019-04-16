const express = require('express');
const routes = express.Router();

const PdfC = require('./controllers/PdfController');
let Bal = require('./models/Balancer');


class RoutesPdf{
    constructor(passport){
        this.passport = passport;
        this.PdfController = new PdfC;
        this.inicializarRotas();
        this.routes = routes;
        this.Balancer = new Bal();
    }

    isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()){
            res.locals.currentUser = req.user;
            return next();
        }
    
        // if they aren't redirect them to the home page
        res.redirect('/api/');
    }
    

    inicializarRotas(){
        routes.get('/auth/google', this.passport.authenticate('google', { scope : ['profile', 'email'] }));

        routes.get('/login',this.passport.authenticate('google', {
                            successRedirect : '/api/index',
                            failureRedirect : '/api/'
        }));

        routes.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/api/');
        });

        routes.get('/', ((req,res) =>{
            res.render('login');
        }))

        routes.get('/index', this.isLoggedIn, (req,res) =>{
            res.render('index', { title: 'Express' });
        });
        
        routes.get('/busca', this.isLoggedIn, (req,res) =>{
            this.PdfController.findByQuery(req.query.b).then((result) =>{
                res.render('resultadosBusca', { 'retorno': result,
                'string': req.query.b,
                'user': req.user});
            }).catch((err) =>{
                console.log('erro1213123', err);
                res.json(err);
            })
        });
        
        routes.get('/inserir', this.isLoggedIn, (req,res) =>{
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

        routes.post('/inserir',this.isLoggedIn, (req,res) =>{
            this.PdfController.inserirPost(req,this.Balancer).then((succ) =>{
                res.render('index', { title: 'Express' });           
            }).catch((err)=>{
                res.json(err);
            })
        });


        routes.get('/delete/:id',this.isLoggedIn,(req,res) =>{
            this.PdfController.deletarPdf(req.params.id).then((succ) =>{
                res.redirect('/index')           
            }).catch((err) =>{
                res.json(err);
            })
        })
    }
    
}


module.exports = RoutesPdf;