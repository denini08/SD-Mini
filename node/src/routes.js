const express = require('express');
const routes = express.Router();

routes.post('/salvar', (req,res) =>{
	console.log('CHEGOU PAPAI')
	console.log('req',req.body);
	console.log('FIle ',req.files.file);

	let arq = req.files.file;

	arq.mv('./arq/' + arq.name,(err) =>{
		if(err){
			res.status(400).json(err);
		} else{
			console.log('Arquivo salvo com sucesso');
		}
	})
	
	res.status(201).json({'mens': 'ok'});
});

routes.get('/sal', (req,res) =>{
	res.status(200).json({'ok': 'ok'})
})

module.exports = routes;

/*
FAZER O UPLOAD DOS PDFS E ENVIAR PARA OS FILHOS
O DOWNLOAD DOS PDS

node:
	ele irar receber o id para ser salvo
	usar o fs para salvar no */