const mongoose = require('mongoose');
const request = require('request-promise');
const Pdf = mongoose.model('Pdf');
const fs = require('fs')
const stream = require('stream');


class PdfController {

    constructor(){
    }
    /* 
        METHOD: GET

        Retorna todos os pdf's cadastrados
    */
    async index(req, res){
        const pdfs = await Pdf.findOne(); 
        return res.json(pdfs);
    }

    
    /* 
        METHOD: GET

        Retorna um pdf pelo id
    */
    async show(req, res){
        const pdf = await Pdf.findById(req.params.id);
        return res.json(pdf);
    }
    
    /* 
        METHOD: POST

        Registra um pdf
    */
    async store(req, res){
        const pdf = await Pdf.create(req.body);
        return res.json(pdf);
    }

    /* 
        METHOD: PUT
        Atualiza um pdf
    */
   async update(req, res){
       const pdf = await Pdf.findByIdAndUpdate(req.params.id, req.body, { new: true });

       return res.json(pdf);
   }

   /*
        GET
   */
   async inserir(req,res){
    res.render('inserir');    
}

/* POST */
 inserirPost(req,res,Balancer){

            let sampleFile = req.files.pdfzin;
            req.files.pdfzin.mv('./teste.pdf', (err) =>{
                if(err){
                    console.log('erro1', err);
                    res.status(400).json(err);
                }else{
                    Balancer.getServidor().then((servidorEnviar) =>{
                        let pdf = {
                            'title': req.body.title,
                            'description': req.body.description,
                            'url': servidorEnviar.ip + ':'+ servidorEnviar.port
                        }
                        console.log('pdfBanco', pdf);
                        //decobrir em qual server salvar o arquivo
                        Pdf.create(pdf).then((pdfz) =>{
                            let pdfS = pdfz;
    
                            const options = {
                                method: 'POST',
                                uri: 'http://'+ servidorEnviar.ip + ':'+ servidorEnviar.port +'/api/salvar',
                                formData: {
                                    id: pdfS.id,
                                    description: req.body.description,
                                    file: {
                                        value: fs.createReadStream('./teste.pdf'),
                                        options:{
                                            filename:  pdfS.id +'.pdf',
                                            contentType: 'application/pdf'
                                        }
                                    }
                                },
                                headers: {
                                     'content-type': 'multipart/form-data'
                                }
                            }
                            
                            request(options).then(function (response){
                                console.log('EVIADO PAPAI')
                                res.status(200).json(response);
                            })
                            .catch(function (err) {
                                console.log('erooww',err);
                                res.status(404);  
                            })
    
                        }).catch((err) =>{
                            console.log('erro2', err);
                            res.status(400).json(err);
                        })
                    })
                } 
            })  
    }

   /* 
        METHOD: PUT

        Deleta um pdf
    */
   async destroy(req, res){
    await Pdf.findByIdAndDelete(req.params.id);

    return res.json({
        message: 'pdf removido com sucesso !'
    });
   }

   async findByQuery(req,res){
    let query = req.query.b;
    let obj =   {title: new RegExp(".*" + query.replace(/(\W)/g, "\\$1") + ".*")};
    let obj2 = {description: new RegExp(".*" + query.replace(/(\W)/g, "\\$1") + ".*")};

    Pdf.find().or([obj,obj2]).then((retorno) =>{ 
        res.render('resultadosBusca', { 'retorno': retorno,
            'string': query});
    }).catch((err)=>{
        console.log('erro1',err);
    });
   }
}

module.exports = PdfController;