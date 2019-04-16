const mongoose = require('mongoose');
const request = require('request-promise');
const Pdf = mongoose.model('Pdf');
const fs = require('fs')
const stream = require('stream');


class PdfController {

    constructor(){
    }
    
/* POST */
 inserirPost(req,Balancer){
        return new Promise((resolve, reject) => {
            req.files.pdfzin.mv('./teste.pdf', (err) =>{
                if(err){
                    console.log('erro1', err);
                    reject(err);
                }else{
                    Balancer.getServidor().then((servidorEnviar) =>{
                        let pdf = {
                            'title': req.body.title,
                            'description': req.body.description,
                            'url': servidorEnviar.ip + ':'+ servidorEnviar.port,
                            'createdBy': {
                                'name': req.user.google.name,
                                'id': req.user.google.id,
                                'email': req.user.google.email,
                            }
                        }
                        console.log('pdfBanco', pdf);
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
                                console.log('EVIADO PAPAI');
                                resolve(response);
                            })
                            .catch(function (err) {
                                console.log('erooww',err);
                                reject(err); 
                            })
    
                        }).catch((err) =>{
                            console.log('erro2', err);
                            reject(err);
                        })
                    })
                } 
            })  
        })
    }

   findByQuery(query){
       return new Promise((resolve, reject)=>{
        let obj =   {title: new RegExp(".*" + query.replace(/(\W)/g, "\\$1") + ".*")};
        let obj2 = {description: new RegExp(".*" + query.replace(/(\W)/g, "\\$1") + ".*")};
    
        Pdf.find().or([obj,obj2]).then((retorno) =>{ 
            resolve(retorno);
        }).catch((err)=>{
            console.log(JSON.stringify(err));
            reject(err);
        });
       })
   }

    getPdf(id){
        return new Promise((resolve, reject) =>{
            Pdf.findById(id).then((res)=>{
                resolve(res.url + '/'+ id + '.pdf');
            }).catch((err) =>{
                reject(err);
            })
        })
    }

    deletarPdf(id){
        return new Promise((resolve,reject) =>{
            Pdf.findById(id).then((pdf) =>{
                let options = {
                    method: 'POST',
                    uri: 'http://' + pdf.url + '/api/remove/' + pdf.id
                };

                request(options).then(function (response){
                    console.log('exluiu papai');
                    Pdf.findByIdAndRemove(id).then((succ) =>{
                        resolve('ok');                    
                    });
                }).catch((err) =>{
                    console.log('erroA', err)
                    reject(err);
                })
            }).catch(err =>{
                console.log('asdasd' , err);
                reject(err);
            })
        })
    }

}

module.exports = PdfController;